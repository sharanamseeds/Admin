(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[6170],{4150:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var l=n(5043),o=n(7392),a=n(3321),r=n(2143),i=n(579);const s=e=>{let{icon:t,onSelect:n,name:s,options:d}=e;const[c,u]=l.useState(null),p=()=>{u(null)};return(0,i.jsxs)("div",{style:{position:"relative"},children:[(0,i.jsx)(o.A,{onClick:e=>{u(e.currentTarget)},children:t}),(0,i.jsx)(a.A,{anchorEl:c,open:Boolean(c),onClose:p,children:null===d||void 0===d?void 0:d.map(((e,t)=>(0,i.jsx)(r.A,{onClick:()=>{return t=e.value,p(),void n(s,t);var t},children:e.label},t)))})]})}},431:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});n(5043);var l=n(579);const o=e=>{let{currentPage:t,totalItems:n,itemsPerPage:o,onPageChange:a,onItemsPerPageChange:r}=e;const i=e=>{e<1||e>s||a(e)},s=Math.ceil(n/o),d=(()=>{if(s>7){let e,n;return t<=3?(e=1,n=5):t+2>=s?(e=s-4,n=s):(e=t-2,n=t+2),Array.from({length:n-e+1},((t,n)=>e+n))}return Array.from({length:s},((e,t)=>t+1))})();return(0,l.jsx)(l.Fragment,{children:s>1&&(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",backgroundColor:"#f4f6f8",borderRadius:"10px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",marginTop:"20px"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,l.jsx)("button",{onClick:()=>i(1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xab"}),(0,l.jsx)("button",{onClick:()=>i(t-1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u2039"}),d[0]>1&&(0,l.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),d.map((e=>(0,l.jsx)("button",{onClick:()=>i(e),style:{backgroundColor:e===t?"#e0e0e0":"white",fontWeight:e===t?"bold":"normal",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer",hover:{backgroundColor:"#f0f0f0"}},children:e},e))),d[d.length-1]<s&&(0,l.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),(0,l.jsx)("button",{onClick:()=>i(t+1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u203a"}),(0,l.jsx)("button",{onClick:()=>i(s),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xbb"})]}),(0,l.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,l.jsxs)("select",{id:"itemsPerPage",value:o,onChange:e=>{a(1),r(Number(e.target.value))},style:{padding:"5px",marginLeft:"10px",borderRadius:"5px",border:"1px solid #ddd",cursor:"pointer"},children:[(0,l.jsx)("option",{value:5,children:"5"}),(0,l.jsx)("option",{value:10,children:"10"}),(0,l.jsx)("option",{value:50,children:"50"})]})})]})})}},7439:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var l=n(8903),o=(n(5043),n(6240)),a=n(6446),r=n(2559),i=n(1906),s=n(4324),d=n(579);const c=function(e){let{searchText:t="Search",title:n="Table",addText:c,handleSearch:u=e=>{},handleAdd:p=()=>{},isClear:m=!1,onClear:x=()=>{}}=e;const v=(0,o.A)();return(0,d.jsxs)(l.Ay,{container:!0,sx:{gap:{xs:"1rem",sx:"1rem",md:"0px",lg:"0px"}},children:[(0,d.jsx)(l.Ay,{item:!0,xs:12,md:3,lg:3,sm:12,sx:{padding:"0px !important",display:"flex",alignItems:"center"},children:(0,d.jsx)("h2",{style:{color:v.palette.common.black,margin:"0px"},children:n})}),(0,d.jsx)(l.Ay,{item:!0,xs:12,md:9,lg:9,sm:12,sx:{padding:"0px !important"},children:(0,d.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"end"},children:[(0,d.jsxs)(a.A,{sx:{position:"relative",padding:c?"0px":"0.5rem",background:"white",borderRadius:"5px",display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,d.jsx)(a.A,{sx:{p:{sm:v.spacing(.75,1.25),xs:v.spacing(1.25)},position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",color:v.palette.common.black,height:"100%"},children:(0,d.jsx)(s.A,{})}),(0,d.jsx)(r.Ay,{placeholder:t,sx:{marginLeft:"2.3rem","& .MuiInputBase-root":{color:v.palette.common.black,mr:3,display:"flex",alignItems:"center"},"& .MuiInputBase-input":{p:v.spacing(1,1,1,0),pl:"calc(1em + ".concat(v.spacing(4),")"),transition:v.transitions.create("width"),color:v.palette.common.black,width:{sm:"100%",md:45},mr:{md:3},"&:focus":{width:{md:225}}}},inputProps:{"aria-label":"search"},onChange:e=>u(e.target.value)})]}),c?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:p,style:{backgroundColor:v.palette.success.main,textTransform:"capitalize",color:v.palette.common.white,":hover":{backgroundColor:v.palette.success.dark}},children:c})}):"",m?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:x,style:{backgroundColor:v.palette.warning.main,textTransform:"capitalize",color:v.palette.common.white,":hover":{backgroundColor:v.palette.warning.dark}},children:"Clear Filter"})}):""]})})]})}},4668:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>j});var l=n(5043),o=n(6240),a=n(7392),r=n(1906),i=n(3216),s=n(184),d=n(3003),c=n(7863),u=n(1944),p=n(1935),m=n(4356),x=n(7439),v=n(4150),g=n(91),f=n(1462),h=n(431),y=n(2450),b=n(579);const j=function(e){let{permission:t}=e;const n=(0,i.Zp)(),j=(0,d.wA)(),[w,k]=(0,l.useState)([]),A=(0,o.A)(),[C,I]=(0,l.useState)(5),[R,S]=(0,l.useState)(1),[T,_]=(0,l.useState)(0),[L,B]=(0,l.useState)({sortField:"createdAt",sortBy:"asc"}),F=async e=>{try{var t;let m={...L};delete m.sortBy,delete m.sortField;let w={limit:C,page:R,sortBy:L.sortField,sortOrder:L.sortBy,...m};e&&(w.search=e);const A=new URLSearchParams(w).toString();j((0,p.vL)());const T=await c.A.get("".concat(u.A.Ledgers.GET_LIST,"?").concat(A));var n,l,o,a,r,i,s,d,x,v,g,f,h,y,b;if(null!==(t=T.data)&&void 0!==t&&t.payload)S(null===(n=T.data)||void 0===n||null===(l=n.payload)||void 0===l||null===(o=l.result)||void 0===o||null===(a=o.meta)||void 0===a?void 0:a.currentPage),I(null===(r=T.data)||void 0===r||null===(i=r.payload)||void 0===i||null===(s=i.result)||void 0===s||null===(d=s.meta)||void 0===d?void 0:d.limit),_(null===(x=T.data)||void 0===x||null===(v=x.payload)||void 0===v||null===(g=v.result)||void 0===g||null===(f=g.meta)||void 0===f?void 0:f.docsFound),k(null===(h=T.data)||void 0===h||null===(y=h.payload)||void 0===y||null===(b=y.result)||void 0===b?void 0:b.data);j((0,p.xv)())}catch(T){var w,A;console.log(T),(0,m.f1)(null===T||void 0===T||null===(w=T.response)||void 0===w||null===(A=w.data)||void 0===A?void 0:A.message),j((0,p.xv)())}},P=((e,t)=>{const n=(0,l.useRef)(null),o=(0,l.useCallback)((function(){for(var l=arguments.length,o=new Array(l),a=0;a<l;a++)o[a]=arguments[a];n.current&&clearTimeout(n.current),n.current=setTimeout((()=>{e(...o)}),t)}),[e,t]);return o})(F,500),E=(e,t)=>{B("invoice_id"===e||"bill_amount"===e||"payment_amount"===e||"createdAt"===e?{sortBy:t,sortField:e}:{[e]:t})};return(0,l.useEffect)((()=>{F()}),[]),(0,l.useEffect)((()=>{F()}),[L,C,R]),(0,b.jsxs)("div",{children:[(0,b.jsx)(x.A,{addText:"View User Ledger",title:"Ledgers",searchText:"Search by Invoice or Type",handleAdd:()=>n("/ledgers/user"),handleSearch:e=>{P(e)},isClear:!0,onClear:()=>{B({sortField:"createdAt",sortBy:"asc"})}}),(0,b.jsx)("div",{style:{width:"100%",marginTop:"1rem"},children:(0,b.jsxs)("div",{style:{fontWeight:"bold",color:A.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:A.palette.background.paper,borderRadius:"10px",boxShadow:A.shadows[1]},children:[(0,b.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,b.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Invoice Id",(0,b.jsx)(v.A,{name:"invoice_id",icon:null!==L&&void 0!==L&&L.sortField&&"invoice_id"===L.sortField&&"asc"!==L.sortBy?(0,b.jsx)(f.hIM,{color:A.palette.common.black,size:15}):(0,b.jsx)(f.wyk,{color:A.palette.common.black,size:15}),onSelect:E,options:g.I1})]}),(0,b.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Type",(0,b.jsx)(v.A,{name:"type",icon:null!==L&&void 0!==L&&L.sortField&&"type"===L.sortField&&"asc"!==L.sortBy?(0,b.jsx)(f.hIM,{color:A.palette.common.black,size:15}):(0,b.jsx)(f.wyk,{color:A.palette.common.black,size:15}),onSelect:E,options:g.aB})]}),(0,b.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Ledger Amount",(0,b.jsx)(v.A,{name:"payment_amount",icon:null!==L&&void 0!==L&&L.sortField&&"payment_amount"===L.sortField&&"asc"!==L.sortBy?(0,b.jsx)(f.hIM,{color:A.palette.common.black,size:15}):(0,b.jsx)(f.wyk,{color:A.palette.common.black,size:15}),onSelect:E,options:g.I1})]}),(0,b.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Bill Amount",(0,b.jsx)(v.A,{name:"bill_amount",icon:null!==L&&void 0!==L&&L.sortField&&"bill_amount"===L.sortField&&"asc"!==L.sortBy?(0,b.jsx)(f.hIM,{color:A.palette.common.black,size:15}):(0,b.jsx)(f.wyk,{color:A.palette.common.black,size:15}),onSelect:E,options:g.I1})]}),(0,b.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Action"})]})}),w.length>0?w.map(((e,l)=>(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:A.palette.background.paper,borderRadius:"10px",boxShadow:A.shadows[1]},children:[(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:C*(R-1)+l+1}),(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.invoice_id}),(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.type}),(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.payment_amount}),(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.bill_amount}),(0,b.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:null!==t&&void 0!==t&&t.can_read?(0,b.jsx)(a.A,{size:"small",onClick:()=>{return t=e._id,void n("/ledgers/view/".concat(t));var t},style:{color:A.palette.info.main},children:(0,b.jsx)(s.Ny1,{})}):""})]},l))):(0,b.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:A.palette.background.paper,borderRadius:"10px",boxShadow:A.shadows[1]},children:"No Ledgers Found"}),(0,b.jsx)(h.A,{currentPage:R,totalItems:T,itemsPerPage:C,onPageChange:S,onItemsPerPageChange:I}),(0,b.jsx)("div",{style:{marginTop:"1rem",display:"flex",justifyContent:"end"},children:(0,b.jsx)(r.A,{variant:"contained",onClick:async()=>{try{j((0,p.vL)());const e=await c.A.get(u.A.Ledgers.DOWNLOAD_EXCEL,{responseType:"blob"}),t=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,y.saveAs)(t,"ledgers.xlsx"),j((0,p.xv)())}catch(n){var e,t;console.log(n),(0,m.f1)(null===n||void 0===n||null===(e=n.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message),j((0,p.xv)())}},style:{backgroundColor:A.palette.success.main,textTransform:"capitalize",color:A.palette.common.white,":hover":{backgroundColor:A.palette.success.dark}},children:"Download Excel Sheet"})})]})}},7863:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var l=n(6213),o=n(1944),a=n(790),r=n(8402);const i=l.A.create({baseURL:o.A.base_url,timeout:1e4,headers:{Accept:"application/json, application/octet-stream"},withCredentials:!1});let s=!1,d=[];i.interceptors.request.use((e=>{const t=localStorage.getItem(a.o.localStorageKeys.token);return t&&(e.headers.Authorization="Bearer ".concat(t),e.withCredentials=!0),e}),(e=>Promise.reject(e))),i.interceptors.response.use((e=>e),(e=>{const{config:t,response:n}=e,l=t;if("Token has expired"===n.data.message){if(!s){s=!0;const t=localStorage.getItem(a.o.localStorageKeys.refresh_token);return i.post(o.A.refresh_token_url,{refreshToken:t}).then((e=>{var t;let{data:n}=e;const o=null===n||void 0===n||null===(t=n.payload)||void 0===t?void 0:t.accessToken;var r;return localStorage.setItem(a.o.localStorageKeys.token,o),s=!1,r=o,d.forEach((e=>e(r))),d=[],l.headers.Authorization="Bearer ".concat(o),i(l)})).catch((t=>(console.error("Failed to refresh token:",t),(0,r.sw)(),window.location.href=o.A.login_path,Promise.reject(e))))}return new Promise((e=>{var t;t=t=>{l.headers.Authorization="Bearer ".concat(t),e(i(l))},d.push(t)}))}return"Token is invalid"===n.data.message&&((0,r.sw)(),window.location.href=o.A.login_path),Promise.reject(e)}));const c=i},91:(e,t,n)=>{"use strict";n.d(t,{$w:()=>m,I1:()=>l,Lw:()=>i,Rr:()=>r,aB:()=>d,bx:()=>o,jH:()=>p,qR:()=>c,qi:()=>s,wX:()=>u,yl:()=>a});const l=[{label:"Sort A to Z",value:"asc"},{label:"Sort Z to A",value:"desc"}],o=[{label:"Active",value:!0},{label:"Inactive",value:!1}],a=[{label:"Unverified",value:!1},{label:"verified",value:!0}],r=[{label:"Newest First",value:"desc"},{label:"Oldest First",value:"asc"}],i=[{label:"Highest First",value:"desc"},{label:"Lowest First",value:"asc"}],s=[{label:"Pending",value:"pending"},{label:"Confirm",value:"confirm"},{label:"Reject",value:"rejected"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"},{label:"Return Requested",value:"return_requested"},{label:"Return Accepeted",value:"return_accepeted"},{label:"Return Rejected",value:"return_rejected"},{label:"Return Fulfilled",value:"return_fulfilled"}],d=[{label:"Credit",value:"credit"},{label:"Debit",value:"debit"}],c=[{label:"Unpaid",value:"unpaid"},{label:"Paid",value:"paid"}],u=[{label:"Cash",value:"cash"},{label:"Online",value:"online"}],p=[{label:"Percentage",value:"percentage"},{label:"Fixed Amount",value:"fixed_amount"},{label:"Tiered",value:"tiered"},{label:"Buy X Get Y",value:"buy_x_get_y"},{label:"Bundle",value:"bundle"},{label:"Referral",value:"referral"},{label:"Coupon",value:"coupon"}],m=[{label:"Percentage",value:"percentage"},{label:"Amount",value:"amount"}]},4356:(e,t,n)=>{"use strict";n.d(t,{f1:()=>r,uT:()=>a});var l=n(1036);n(2342);const o={position:"top-center",closeButton:!1,progress:!1},a=e=>{l.oR.success(e,o)},r=e=>{l.oR.error(e,o)}},2450:function(e,t,n){var l,o,a;o=[],void 0===(a="function"===typeof(l=function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function l(e,t,n){var l=new XMLHttpRequest;l.open("GET",e),l.responseType="blob",l.onload=function(){s(l.response,t,n)},l.onerror=function(){console.error("could not download file")},l.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function a(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(l){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n.g&&n.g.global===n.g?n.g:void 0,i=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(e,t,n){var i=r.URL||r.webkitURL,s=document.createElement("a");t=t||e.name||"download",s.download=t,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?a(s):o(s.href)?l(e,t,n):a(s,s.target="_blank")):(s.href=i.createObjectURL(e),setTimeout((function(){i.revokeObjectURL(s.href)}),4e4),setTimeout((function(){a(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,r){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,r),n);else if(o(e))l(e,n,r);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){a(i)}))}}:function(e,t,n,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return l(e,t,n);var a="application/octet-stream"===e.type,s=/constructor/i.test(r.HTMLElement)||r.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||a&&s||i)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},c.readAsDataURL(e)}else{var u=r.URL||r.webkitURL,p=u.createObjectURL(e);o?o.location=p:location.href=p,o=null,setTimeout((function(){u.revokeObjectURL(p)}),4e4)}});r.saveAs=s.saveAs=s,e.exports=s})?l.apply(t,o):l)||(e.exports=a)}}]);
//# sourceMappingURL=6170.3212e724.chunk.js.map