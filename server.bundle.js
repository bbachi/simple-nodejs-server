!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){const n=r(1),o=r(2),s=r(3),a=r(4),i=(process.env.HOST,process.env.PORT||3030);function u(e,t){e.statusCode=t,e.end(`{"error": "${n.STATUS_CODES[t]}"}`)}n.createServer((e,t)=>"GET"===e.method?function(e,t){const{pathname:r}=s.parse(e.url);if("/users"!==r)return u(t,404);return t.setHeader("Content-Type","application/json;charset=utf-8"),t.end(JSON.stringify(a.getUsers()))}(e,t):"POST"===e.method?function(e,t){const r=parseInt(e.headers["content-length"],10),n=Buffer.allocUnsafe(r);var o=0;const{pathname:i}=s.parse(e.url);if("/user"!==i)return u(t,404);e.on("data",e=>{const s=o+e.length;s>r?reject(413,"Too Large",t):(e.copy(n,o),o=s)}).on("end",()=>{if(o!==r)return void reject(400,"Bad Request",t);const e=JSON.parse(n.toString());a.saveUser(e),console.log("User Posted: ",e),t.setHeader("Content-Type","application/json;charset=utf-8"),t.end("You Posted: "+JSON.stringify(e))})}(e,t):"DELETE"===e.method?function(e,t){const{pathname:r,query:n}=s.parse(e.url);if("/user"!==r)return u(t,404);const{id:i}=o.parse(n),c=a.deleteUser(i);t.setHeader("Content-Type","application/json;charset=utf-8"),t.end(`{"userDeleted": ${c}}`)}(e,t):"PUT"===e.method?function(e,t){const{pathname:r,query:n}=s.parse(e.url);if("/user"!==r)return u(t,404);const{id:i}=o.parse(n),c=parseInt(e.headers["content-length"],10),l=Buffer.allocUnsafe(c);var f=0;e.on("data",e=>{const r=f+e.length;r>c?reject(413,"Too Large",t):(e.copy(l,f),f=r)}).on("end",()=>{if(f!==c)return void reject(400,"Bad Request",t);const e=JSON.parse(l.toString()),r=a.replaceUser(i,e);t.setHeader("Content-Type","application/json;charset=utf-8"),t.end(`{"userUpdated": ${r}}`)})}(e,t):void 0).listen(i,()=>{console.log(`Server listening on port ${i}`)})},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("querystring")},function(e,t){e.exports=require("url")},function(e,t){let r=[{id:1,firstName:"first1",lastName:"last1",email:"abc@gmail.com"},{id:2,firstName:"first2",lastName:"last2",email:"abc@gmail.com"},{id:3,firstName:"first3",lastName:"last3",email:"abc@gmail.com"},{id:4,firstName:"first4",lastName:"last4",email:"abc@gmail.com"}];const n=function(){};n.prototype.getUsers=function(){return r},n.prototype.saveUser=function(e){const t=r.length;e.id=t+1,r.push(e)},n.prototype.deleteUser=function(e){const t=r.length;return r=r.filter(t=>t.id!=e),r.length!==t},n.prototype.replaceUser=function(e,t){return 0!==r.filter(t=>t.id==e).length&&(r=r.map(r=>(e==r.id&&(r={id:r.id,...t}),r)),!0)},e.exports=new n}]);