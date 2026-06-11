// public/rms-noise-processor.js

// -------------------- Internal constants (not configurable) --------------------

/** One-sided hysteresis band (dB) around the speak-on threshold; signal must drop this far *below* speakOn before isSpeaking resets to false, preventing rapid on/off flutter. */
const SPEAK_HYSTERESIS_DB = 3
/** Hard lower clamp for floorDb and ambientFloorDb; prevents the floor from sinking below typical ADC noise even during complete silence. */
const MIN_FLOOR_DB = -90
/** Hard upper clamp for floorDb and ambientFloorDb; a floor this high would indicate an extremely loud environment. */
const MAX_FLOOR_DB = -10
/** Minimum RMS value before log conversion to avoid log(0); 1e-8 corresponds to approximately -160 dBFS. */
const MIN_RMS = 1e-8

// All tunable values must be passed via processorOptions — there are no defaults.
// The authoritative values live in GetMicStream.ts.
// ------------------------------------------------------------

function required(value, name) {
  if (typeof value !== "number") {
    throw new Error(`rms-noise-processor: missing required processorOption "${name}"`)
  }
  return value
}

class RmsNoiseProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super()
    const o = (options && options.processorOptions) || {}

    // A) speaking
    /** How many dBFS above the tracked noise floor the signal must exceed to count as speech. Higher = less sensitive; 16 dB leaves headroom over mic self-noise (~-78 dBFS) while still catching quiet speech (~-62 dBFS). */
    this.speechDeltaDb = required(o.speechDeltaDb, "speechDeltaDb")
    /** Consecutive frames above speakOn required to flip isSpeaking to true; guards against brief transients. At ~375 calls/s, 2 frames ≈ 5 ms. */
    this.attackFrames = required(o.attackFrames, "attackFrames")
    /** Consecutive frames below speakOff required to flip isSpeaking back to false; keeps speaking=true from dropping out mid-word. At ~375 calls/s, 8 frames ≈ 21 ms. */
    this.releaseFrames = required(o.releaseFrames, "releaseFrames")

    // B) room noisy
    /** Ambient floor threshold in dBFS above which the room is considered noisy; -55 dBFS corresponds to clearly audible continuous background noise (e.g. traffic, loud HVAC). */
    this.roomNoisyFloorDb = required(o.roomNoisyFloorDb, "roomNoisyFloorDb")
    /** EMA rise coefficient for ambientFloorDb; applied on every frame regardless of isSpeaking so persistent noise accumulates even when speech is continuously detected. ~2.7 s to rise 25 dB — intentionally slower than the fall so brief loud bursts don't prematurely flag the room as noisy. */
    this.ambientUpAlpha = required(o.ambientUpAlpha, "ambientUpAlpha")
    /** EMA fall coefficient for ambientFloorDb; only applied when isSpeaking is false so the ambient level stays elevated while noise is ongoing. ~1 s to fall 25 dB after noise clears. */
    this.ambientDownAlpha = required(o.ambientDownAlpha, "ambientDownAlpha")

    // floor tracking
    /** EMA rise coefficient for floorDb; slow so the quiet baseline creeps up only when the room genuinely gets louder over time. */
    this.floorUpAlpha = required(o.floorUpAlpha, "floorUpAlpha")
    /** EMA fall coefficient for floorDb; faster than rise so the floor drops quickly when the room gets quieter, keeping speaking detection responsive. */
    this.floorDownAlpha = required(o.floorDownAlpha, "floorDownAlpha")
    /** floorDb only updates when not speaking and db is within this margin above the floor, keeping it as a quiet baseline. Signals above the margin (speech or loud noise) are excluded from floor tracking. */
    this.floorUpdateMarginDb = required(o.floorUpdateMarginDb, "floorUpdateMarginDb")

    // warmup
    /** Frames of audio processed before speaking detection activates; during warmup floorDb converges quickly so it does not get stuck at MIN_FLOOR_DB and cause spurious isSpeaking=true. At ~375 calls/s, 375 frames ≈ 1 s. */
    this.warmupFrames = required(o.warmupFrames, "warmupFrames")

    // messaging
    /** Post a message to the main thread every N process() calls to throttle IPC overhead; at ~375 calls/s and postEvery=8 this yields ~47 messages/s. */
    this.postEvery = required(o.postEvery, "postEvery")

    // state
    /** Initial value for both floorDb and ambientFloorDb before any audio is processed. */
    const initialFloorDb = required(o.initialFloorDb, "initialFloorDb")
    this.floorDb = initialFloorDb
    this.ambientFloorDb = initialFloorDb
    this.aboveCount = 0
    this.belowCount = 0
    this.isSpeaking = false
    this._tick = 0
  }

  process(inputs) {
    const input = inputs[0]
    const ch0 = input && input[0]
    if (!ch0) return true

    // RMS -> dBFS
    let sumSq = 0
    for (let i = 0; i < ch0.length; i++) {
      const v = ch0[i]
      sumSq += v * v
    }
    const rms = Math.sqrt(sumSq / ch0.length)
    const db = 20 * Math.log10(Math.max(rms, MIN_RMS))

    // --- Floor bootstrap + tracking (speaking detection) ---
    const inWarmup = this._tick < this.warmupFrames

    // During warmup: always update floor quickly toward current db.
    // After warmup: only track when quiet — not speaking and signal within margin
    // above floor. This keeps floorDb as a true quiet baseline; signals above the
    // margin (speech or loud noise) do not move the floor.
    const allowFloorUpdate =
      inWarmup || (!this.isSpeaking && db < (this.floorDb + this.floorUpdateMarginDb))

    if (allowFloorUpdate) {
      if (inWarmup) {
        // Converge quickly so we don't get stuck at MIN_FLOOR_DB
        const alpha = 0.2
        this.floorDb = this.floorDb + (db - this.floorDb) * alpha
      } else {
        // Asymmetric tracking: rise slowly, fall faster
        if (db > this.floorDb) {
          this.floorDb = this.floorDb + (db - this.floorDb) * this.floorUpAlpha
        } else {
          this.floorDb = this.floorDb + (db - this.floorDb) * this.floorDownAlpha
        }
      }
    }

    // Clamp floor
    if (this.floorDb > MAX_FLOOR_DB) this.floorDb = MAX_FLOOR_DB
    if (this.floorDb < MIN_FLOOR_DB) this.floorDb = MIN_FLOOR_DB

    // --- A) Speaking detection relative to floor with hysteresis ---
    const speakOn = this.floorDb + this.speechDeltaDb
    const speakOff = speakOn - SPEAK_HYSTERESIS_DB

    const above = db > speakOn
    const below = db < speakOff

    if (above) {
      this.aboveCount++
      this.belowCount = 0
      if (!this.isSpeaking && this.aboveCount >= this.attackFrames) this.isSpeaking = true
    } else if (below) {
      this.belowCount++
      this.aboveCount = 0
      if (this.isSpeaking && this.belowCount >= this.releaseFrames) this.isSpeaking = false
    } else {
      // in hysteresis band: hold
      this.aboveCount = 0
      this.belowCount = 0
    }

    // --- B) Ambient floor tracking (room noise detection) ---
    // Always rises so persistent background noise pushes it up even when
    // isSpeaking stays true continuously. Only falls when quiet.
    if (!inWarmup) {
      if (db > this.ambientFloorDb) {
        this.ambientFloorDb += (db - this.ambientFloorDb) * this.ambientUpAlpha
      } else if (!this.isSpeaking) {
        this.ambientFloorDb += (db - this.ambientFloorDb) * this.ambientDownAlpha
      }
      if (this.ambientFloorDb > MAX_FLOOR_DB) this.ambientFloorDb = MAX_FLOOR_DB
      if (this.ambientFloorDb < MIN_FLOOR_DB) this.ambientFloorDb = MIN_FLOOR_DB
    }

    const isRoomNoisy = this.ambientFloorDb > this.roomNoisyFloorDb

    // Post occasionally
    this._tick++
    if (this._tick % this.postEvery === 0) {
      this.port.postMessage({
        rms,
        db,
        floorDb: this.floorDb,
        ambientFloorDb: this.ambientFloorDb,
        isSpeaking: this.isSpeaking,
        isRoomNoisy
      })
    }

    return true
  }
}

registerProcessor("rms-noise-processor", RmsNoiseProcessor)
