import{l5 as W,hS as q,l6 as B,hR as S,t as D,a4 as O,fz as k,n as C,l8 as _,jr as g}from"./app-C59A5iCL.js";import{f as h,S as E,a as P,b as v,c as I,e as A,g as z,h as H,i as U,j as Q,k as x,l as G,m as N}from"./studentFriendFileHelpers-D0ZzG5Ov.js";import{StudentModel as T}from"./studentFns-BGAww025.js";import{h as L,t as $,a as b}from"./studentFriendFile-BUjtfSOp.js";import"./design-system-DN-1MC-M.js";import"./calcReward-DktwH_k9.js";import"./schoolFriendFileHelpers-fcFJVQyy.js";import"./segmentFriendFileHelpers-CZYPCzcr.js";import"./studentGroupFriendFileHelpers-DuFUZMT5.js";import"./studentGroupFlatFriendFile-BW97Y0Ne.js";import"./groups-CVYdwNRS.js";function u(p,y,t){return(y=R(y))in p?Object.defineProperty(p,y,{value:t,enumerable:!0,configurable:!0,writable:!0}):p[y]=t,p}function R(p){var y=j(p,"string");return typeof y=="symbol"?y:y+""}function j(p,y){if(typeof p!="object"||!p)return p;var t=p[Symbol.toPrimitive];if(t!==void 0){var e=t.call(p,y);if(typeof e!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(y==="string"?String:Number)(p)}class rt extends W{constructor(y){super({fromGql:h,sdk:y,BaseHooks:L}),u(this,"toUpdateGql",void 0),u(this,"toCreateGql",void 0),u(this,"fns",void 0),u(this,"getOrderByAndDistinctOn",(t,e,s)=>e&&e.length&&(!t||!t.length)?(t=e.map(r=>({[r]:q.Asc})),{orderBy:t,distinctOn:e}):((!t||!t.length)&&(s?t=[]:t=[{user_id:q.Asc}]),{orderBy:t,distinctOn:e||[]})),u(this,"AggregateQuery",async(t,e)=>{const s=this.getOrderByAndDistinctOn(void 0,e,!0),{data:r,errors:i}=await this.sdk.client.query({query:E,variables:{where:t,distinct_on:s.distinctOn}});if(i)throw i;return r?.people_student_aggregate?.aggregate?.count||0}),u(this,"BaseQuery",async(t,e,s,r)=>{const i=this.getOrderByAndDistinctOn(e,s,!0),n={where:t};e&&(n.order_by=i.orderBy),s&&(n.distinct_on=i.distinctOn);const{data:o,errors:a}=await this.sdk.client.query({fetchPolicy:r||"no-cache",query:P,variables:n});if(a)throw a;return o?o.people_student.map(h):[]}),u(this,"BaseQueryWatched",async(t,e,s,r,i)=>{const n=this.getOrderByAndDistinctOn(s,r,!0),o={where:t};s&&(o.order_by=n.orderBy),r&&(o.distinct_on=n.distinctOn);const d=this.sdk.client.watchQuery({fetchPolicy:i||"cache-and-network",query:P,variables:o}).subscribe(c=>e(c?.data?.people_student.map(h)||[]));return()=>d.unsubscribe()}),u(this,"BasePaginatedQuery",async t=>{const{where:e,limit:s,offset:r}=t,{orderBy:i,distinctOn:n}=this.getOrderByAndDistinctOn(t.orderBy,t.distinctOn),{data:o,errors:a}=await this.sdk.client.query({fetchPolicy:"no-cache",query:v,variables:{where:e,limit:s,offset:r,order_by:i,distinct_on:n}});if(a)throw a;return{data:o?o.people_student.map(h):[],count:o?.people_student_aggregate.aggregate?.count||0}}),u(this,"BaseSubscription",async(t,e)=>{const r=(await this.sdk.client.subscribe({fetchPolicy:"no-cache",query:I,variables:{where:t}})).subscribe(i=>{try{e(i.data?i.data.people_student.map(h):[])}catch(n){e([]),console.error("error happened",n)}});return B(r)}),u(this,"BasePaginatedSubscription",async(t,e)=>{const{where:s,limit:r,offset:i}=t,{orderBy:n,distinctOn:o}=this.getOrderByAndDistinctOn(t.orderBy,t.distinctOn),d=(await this.sdk.client.subscribe({fetchPolicy:"no-cache",query:A,variables:{where:s,limit:r,offset:i,order_by:n,distinct_on:o}})).subscribe(c=>{try{e(c.data?c.data.people_student.map(h):[])}catch(l){e([]),console.error("error happened",l)}});return B(d)}),u(this,"BaseSubscriptionStream",async t=>{const{batchSize:e,cursor:s,where:r,onValueFn:i}=t,a={where:r,batch_size:e||100,cursor:s||{initial_value:{user_id:0},ordering:"ASC"}},c=(await this.sdk.client.subscribe({fetchPolicy:"no-cache",query:z,variables:a})).subscribe(l=>{try{i(l.data?l.data.people_student_stream.map(h):[])}catch(f){i([]),console.error("error happened",f)}});return B(c)}),u(this,"Basic",{insert:async(t,e)=>{const s={fetchPolicy:"no-cache",mutation:U,variables:{objects:t}};if(e){delete s.fetchPolicy,s.update=(n,{data:o})=>{n.modify({fields:{people_student(a=[]){const d=o?.insert_people_student?.returning||[],c=d.map(f=>f.user_id);return[...a.filter(f=>!c.includes(f.user_id)),...d]}}})};const{data:r,errors:i}=await this.sdk.client.mutate(s);if(i)throw i;return r?.insert_people_student?.returning?.map(h)||[]}else{const{data:r,errors:i}=await this.sdk.client.mutate(s);if(i)throw i;return r?.insert_people_student?.returning?.map(h)||[]}},update:async(t,e,s)=>{const r={fetchPolicy:"no-cache",mutation:H,variables:{where:t,set:S(e,(o,a)=>a!=="user_id")}};s&&(delete r.fetchPolicy,r.refetchQueries=[{query:P,variables:{where:t}}]);const{data:i,errors:n}=await this.sdk.client.mutate(r);if(n)throw n;return i?.update_people_student?.returning?.map(h)||[]}}),u(this,"BaseInsert",async(t,e)=>{const{sdk:s,BaseHooks:r}=this;s.role&&r?.sanitizePayload?.insert&&(t=await r.sanitizePayload.insert(t,s.role));const i=await Promise.all(t.map(b));return this.Basic.insert(i,e)}),u(this,"BaseUpdate",async(t,e,s)=>{const{sdk:r,BaseHooks:i}=this;r.role&&i?.sanitizePayload?.update&&(e=await i.sanitizePayload.update(e,r.role));const n=await $(e);return this.Basic.update(t,n,s)}),u(this,"BaseDelete",async(t,e)=>{const s={mutation:Q,variables:{where:t},fetchPolicy:"no-cache"};e&&(delete s.fetchPolicy,s.update=n=>{n.modify({fields:{people_student(o=[],{readField:a}){return o.filter(d=>!a("user_id",d))}}})});const{data:r,errors:i}=await this.sdk.client.mutate(s);if(i)throw i;return r?.delete_people_student?.returning?.map(h)||[]}),u(this,"Bare",{insert:async t=>{const{data:e,errors:s}=await this.sdk.client.mutate({fetchPolicy:"no-cache",mutation:G,variables:{objects:t}});if(s)throw s;return e?.insert_people_student?.affected_rows||0},update:async(t,e,s)=>{const{data:r,errors:i}=await this.sdk.client.mutate({fetchPolicy:s?void 0:"no-cache",mutation:x,variables:{where:t,set:S(e,(n,o)=>o!=="user_id")}});if(i)throw i;return r?.update_people_student?.affected_rows||0}}),u(this,"BareInsert",async t=>{const{sdk:e,BaseHooks:s}=this;e.role&&s?.sanitizePayload?.insert&&(t=await s.sanitizePayload.insert(t,e.role));const r=await Promise.all(t.map(b));return this.Bare.insert(r)}),u(this,"BareUpdate",async(t,e)=>{const{sdk:s,BaseHooks:r}=this;s.role&&r?.sanitizePayload?.update&&(e=await r.sanitizePayload.update(e,s.role));const i=await $(e);return this.Bare.update(t,i)}),u(this,"BareDelete",async(t,e)=>{const s={fetchPolicy:"no-cache",mutation:N,variables:{where:t}};e&&(delete s.fetchPolicy,s.update=n=>{n.modify({fields:{people_student(o=[],{readField:a}){return o.filter(d=>!a("user_id",d))}}})});const{data:r,errors:i}=await this.sdk.client.mutate(s);if(i)throw i;return r?.delete_people_student?.affected_rows||0}),u(this,"toId",t=>typeof t=="string"?D(t):t),u(this,"get",async t=>{const[e]=await this.getWhere({user_id:{_eq:this.toId(t)}});return e||void 0}),u(this,"getOrThrow",async t=>{const e=await this.get(t);if(e)return e;throw new Error(`No student exists with id: ${t}`)}),u(this,"update",async(t,e)=>{if(!t.id)throw new Error("Cannot updatePartial student without providing user_id");const s=await this.get(t.id);if(!s)throw new Error(`Cannot updatePartial student because no record exists with id: ${t.id}`);const r={...s,...t},[i]=await this.updateWhere({user_id:{_eq:this.toId(t.id)}},r,e);if(!i)throw new Error("student: updateWhere returned nothing");return i}),u(this,"delete",async t=>{if(!await this.get(t))throw new Error(`Cannot delete student because no record exists with id: ${t}`);const[s]=await this.deleteWhere({user_id:{_eq:this.toId(t)}});if(!s)throw new Error("student: deleteWhere returned nothing");return s}),u(this,"deleteIfExists",async t=>{try{return await this.delete(t)}catch(e){console.warn(e);return}}),u(this,"subscribe",async(t,e)=>await this.subscribeWhere({user_id:{_eq:this.toId(t)}},r=>e(r.length?r[0]:void 0))),u(this,"batch",{get:async t=>{const e=await this.getWhere({user_id:{_in:t.map(this.toId)}});return t.map(s=>e.find(r=>r.id?.toString()===s.toString()))},updateNoThrow:async t=>{const e=[],s=async i=>{const n=i.id;if(!n){e.push(`STUDENT.batch.update failed on an item because no id was present: ${JSON.stringify(i,null,4)}`);return}try{return await this.update(i)}catch(o){const a=o;e.push(`STUDENT.batch.update failed on ${n}: ${a.message||a.code||JSON.stringify(i,null,4)}`);return}},r=await Promise.all(t.map(s));return{errors:e,data:r.filter(C)}},update:async t=>{const{errors:e,data:s}=await this.batch.updateNoThrow(t);if(e.length)throw e;return s},delete:async t=>{const e=await this.deleteWhere({user_id:{_in:t.map(this.toId)}});return t.map(s=>e.find(r=>r.id?.toString()===s.toString()))},subscribe:async(t,e)=>await this.subscribeWhere({user_id:{_in:t.map(this.toId)}},e),updateInChunks:async(t,e=100)=>{const s=O(t,e),r=[],i=s.map(n=>async()=>{const o=await this.batch.update(n);r.push(...o)});return await k(i,void 0,!0),r}}),u(this,"pg",t=>{const e="People_Student".toLowerCase();return{aggregate:async(s,r)=>{this.BaseHooks?.beforeWhere&&(s=await this.BaseHooks.beforeWhere({where:s}));const i=_.toDistinctOnClause(r?.distinctOn),n=_.toOrderByClause(r?.orderBy),o=_.where.query(s),c=`SELECT COUNT(*) FROM (${`${`SELECT ${i?`${i} *`:"*"}`} FROM ${e} WHERE ${o} ${n}`}) AS subquery`;r?.verbose&&console.log(`pg.getCountWhere(${e})::${c}`);const l=await t.query(c);return parseInt(l.rows[0].count,10)},getWhere:async(s,r)=>{this.BaseHooks?.beforeWhere&&(s=await this.BaseHooks.beforeWhere({where:s}));const i=_.toDistinctOnClause(r?.distinctOn),n=_.toOrderByClause(r?.orderBy),o=_.where.query(s),a=`SELECT ${i?`${i} *`:"*"} FROM ${e} WHERE ${o} ${n};`;return r?.verbose&&console.log(`pg.getWhere(${e})::${a}`),(await t.query(a)).rows.map(h)},updateWhere:async(s,r,i)=>{this.BaseHooks?.beforeWhere&&(s=await this.BaseHooks.beforeWhere({where:s}));const n=_.update(e,$(r),s);return i&&console.log(`pg.updateWhere(${e})::${n}`),(await t.query(n)).rows.map(h)},batchUpdate:async(s,r,i,n)=>{i&&console.log(`pg.batchUpdate(${e})`);const o=O(s.filter(c=>!!c.id),r||100),a=[],d=o.map((c,l)=>async()=>{const f=(l+1)/o.length;n&&n(f);const w=await Promise.all(c.map(m=>this.pg(t).updateWhere({user_id:{_eq:this.toId(m.id||"")}},m)));a.push(...w.flat())});return await k(d,void 0,!0),a},insert:async(s,r,i)=>{const n=_.insert(e,s.map(b),i);return r&&console.log(`pg.insert(${e})::${n}`),(await t.query(n)).rows.map(h)},deleteWhere:async(s,r)=>{this.BaseHooks?.beforeWhere&&(s=await this.BaseHooks.beforeWhere({where:s}));const i=`DELETE FROM ${e} WHERE ${_.where.query(s)} RETURNING *;`;return r&&console.log(`pg.delete(${e})::${i}`),(await t.query(i)).rows.map(h)},upsert:async(s,r,i,n)=>{const o=_.upsert({tableName:e,vals:s.map(b),conflictColNames:i||["user_id"],ignoreColNames:n});return r&&console.log(`pg.upsert(${e})::${o}`),(await t.query(o)).rows.map(h)}}}),u(this,"partial",{subscriptionStream:async t=>{const{batchSize:e,cursor:s,where:r,onValueFn:i,columns:n}=t,d={where:r,batch_size:e||100,cursor:s||{initial_value:{user_id:0},ordering:"ASC"}},c=`
                subscription StudentStreamPartial(
                    $where: people_student_bool_exp!
                    $batch_size: Int!
                    $cursor: [people_student_stream_cursor_input]!
                ) {
                    people_student_stream(
                        where: $where
                        batch_size: $batch_size
                        cursor: $cursor
                    ) {
                        ${n.join(",")}
                    }
                }`,f=(await this.sdk.client.subscribe({fetchPolicy:"no-cache",query:g(c),variables:d})).subscribe(w=>{try{i(w.data?w.data.people_student_stream:[])}catch(m){i([]),console.error("error happened",m)}});return B(f)},getWhereBare:async t=>{const{where:e,orderBy:s,distinctOn:r,fetchPolicy:i,columns:n}=t,o=this.getOrderByAndDistinctOn(s,r,!0),a={where:e};s&&(a.order_by=o.orderBy),r&&(a.distinct_on=o.distinctOn);const d=`
                query StudentBaseQueryPartial(
                    $where: people_student_bool_exp!
                    $order_by: [people_student_order_by!]
                    $distinct_on: [people_student_select_column!]
                ) {
                    people_student(
                        where: $where
                        order_by: $order_by
                        distinct_on: $distinct_on
                    ) {
                        ${n.join(",")}
                    }
                }
            `,{data:c,errors:l}=await this.sdk.client.query({query:g(d),variables:a,fetchPolicy:i||"no-cache"});if(l)throw l;return c?c.people_student:[]},getWhereBarePaginated:async t=>{const{where:e,limit:s,offset:r,columns:i,fetchPolicy:n}=t,{orderBy:o,distinctOn:a}=this.getOrderByAndDistinctOn(t.orderBy,t.distinctOn),d=`
                query StudentBaseQueryWithOffsetLimitPartial(
                    $where: people_student_bool_exp!
                    $limit: Int!
                    $offset: Int!
                    $order_by: [people_student_order_by!]
                    $distinct_on: [people_student_select_column!]
                ) {
                    people_student(
                        where: $where
                        offset: $offset
                        limit: $limit
                        order_by: $order_by
                        distinct_on: $distinct_on
                    ) {
                        ${i.join(",")}
                    }
                    people_student_aggregate(where: $where) {
                        aggregate {
                            count
                        }
                    }
                }
            `,{data:c,errors:l}=await this.sdk.client.query({query:g(d),variables:{where:e,limit:s,offset:r,order_by:o,distinct_on:a},fetchPolicy:n||"no-cache"});if(l)throw l;return{data:c?c.people_student:[],count:c?.people_student_aggregate.aggregate?.count||0}},getWhereBarePaginatedComplete:async t=>{const e=[];let s=!1,r=t.offset||0;for(;!s;){const{data:i,count:n}=await this.partial.getWhereBarePaginated({offset:r,columns:t.columns,where:t.where,distinctOn:t.distinctOn,orderBy:t.orderBy,limit:t.limit,fetchPolicy:t.fetchPolicy});r+=t.limit,e.push(...i),t.onProgress&&t.onProgress({totalItems:n,progressPercent:n?e.length/n:1}),i.length||(s=!0)}return e}}),u(this,"partialUntypedGql",{getWhereBare:async t=>{const{where:e,orderBy:s,distinctOn:r,fetchPolicy:i,columnsGql:n}=t,o=this.getOrderByAndDistinctOn(s,r,!0),a={where:e};s&&(a.order_by=o.orderBy),r&&(a.distinct_on=o.distinctOn);const d=`
                query StudentBaseQueryPartial(
                    $where: people_student_bool_exp!
                    $order_by: [people_student_order_by!]
                    $distinct_on: [people_student_select_column!]
                ) {
                    people_student(
                        where: $where
                        order_by: $order_by
                        distinct_on: $distinct_on
                    ) {
                        ${n}
                    }
                }
            `,{data:c,errors:l}=await this.sdk.client.query({query:g(d),variables:a,fetchPolicy:i||"no-cache"});if(l)throw l;return c?c.people_student:[]},getWhereBarePaginated:async t=>{const{where:e,limit:s,offset:r,columnsGql:i,fetchPolicy:n}=t,{orderBy:o,distinctOn:a}=this.getOrderByAndDistinctOn(t.orderBy,t.distinctOn),d=`
                query StudentBaseQueryWithOffsetLimitPartial(
                    $where: people_student_bool_exp!
                    $limit: Int!
                    $offset: Int!
                    $order_by: [people_student_order_by!]
                    $distinct_on: [people_student_select_column!]
                ) {
                    people_student(
                        where: $where
                        offset: $offset
                        limit: $limit
                        order_by: $order_by
                        distinct_on: $distinct_on
                    ) {
                        ${i}
                    }
                    people_student_aggregate(where: $where) {
                        aggregate {
                            count
                        }
                    }
                }
            `,{data:c,errors:l}=await this.sdk.client.query({query:g(d),variables:{where:e,limit:s,offset:r,order_by:o,distinct_on:a},fetchPolicy:n||"no-cache"});if(l)throw l;return{data:c?c.people_student:[],count:c?.people_student_aggregate.aggregate?.count||0}},getWhereBarePaginatedComplete:async t=>{const e=[];let s=!1,r=t.offset||0;for(;!s;){const{data:i,count:n}=await this.partialUntypedGql.getWhereBarePaginated({offset:r,columnsGql:t.columnsGql,where:t.where,distinctOn:t.distinctOn,orderBy:t.orderBy,limit:t.limit,fetchPolicy:t.fetchPolicy});r+=t.limit,e.push(...i),t.onProgress&&t.onProgress({totalItems:n,progressPercent:n?e.length/n:1}),i.length||(s=!0)}return e}}),u(this,"BaseQueryWithOffsetLimit",async(t,e,s,r,i,n)=>{const{data:o,errors:a}=await this.sdk.client.query({fetchPolicy:n||"no-cache",query:v,variables:{where:t,limit:e,offset:s,order_by:r,distinct_on:i}});if(a)throw a;return o}),this.toUpdateGql=$,this.toCreateGql=b,this.fns=new T(y,this)}}export{rt as Student};
