(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[3855],{4150:(e,t,n)=>{"use strict";n.d(t,{A:()=>s});var a=n(5043),o=n(7392),l=n(3321),r=n(2143),i=n(579);const s=e=>{let{icon:t,onSelect:n,name:s,options:d}=e;const[c,u]=a.useState(null),p=()=>{u(null)};return(0,i.jsxs)("div",{style:{position:"relative"},children:[(0,i.jsx)(o.A,{onClick:e=>{u(e.currentTarget)},children:t}),(0,i.jsx)(l.A,{anchorEl:c,open:Boolean(c),onClose:p,children:null===d||void 0===d?void 0:d.map(((e,t)=>(0,i.jsx)(r.A,{onClick:()=>{return t=e.value,p(),void n(s,t);var t},children:e.label},t)))})]})}},431:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});n(5043);var a=n(579);const o=e=>{let{currentPage:t,totalItems:n,itemsPerPage:o,onPageChange:l,onItemsPerPageChange:r}=e;const i=e=>{e<1||e>s||l(e)},s=Math.ceil(n/o),d=(()=>{if(s>7){let e,n;return t<=3?(e=1,n=5):t+2>=s?(e=s-4,n=s):(e=t-2,n=t+2),Array.from({length:n-e+1},((t,n)=>e+n))}return Array.from({length:s},((e,t)=>t+1))})();return(0,a.jsx)(a.Fragment,{children:s>1&&(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",backgroundColor:"#f4f6f8",borderRadius:"10px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",marginTop:"20px"},children:[(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,a.jsx)("button",{onClick:()=>i(1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xab"}),(0,a.jsx)("button",{onClick:()=>i(t-1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u2039"}),d[0]>1&&(0,a.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),d.map((e=>(0,a.jsx)("button",{onClick:()=>i(e),style:{backgroundColor:e===t?"#e0e0e0":"white",fontWeight:e===t?"bold":"normal",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer",hover:{backgroundColor:"#f0f0f0"}},children:e},e))),d[d.length-1]<s&&(0,a.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),(0,a.jsx)("button",{onClick:()=>i(t+1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u203a"}),(0,a.jsx)("button",{onClick:()=>i(s),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xbb"})]}),(0,a.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,a.jsxs)("select",{id:"itemsPerPage",value:o,onChange:e=>{l(1),r(Number(e.target.value))},style:{padding:"5px",marginLeft:"10px",borderRadius:"5px",border:"1px solid #ddd",cursor:"pointer"},children:[(0,a.jsx)("option",{value:5,children:"5"}),(0,a.jsx)("option",{value:10,children:"10"}),(0,a.jsx)("option",{value:50,children:"50"})]})})]})})}},7439:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var a=n(8903),o=(n(5043),n(6240)),l=n(6446),r=n(2559),i=n(1906),s=n(4324),d=n(579);const c=function(e){let{searchText:t="Search",title:n="Table",addText:c,handleSearch:u=e=>{},handleAdd:p=()=>{},isClear:g=!1,onClear:v=()=>{}}=e;const x=(0,o.A)();return(0,d.jsxs)(a.Ay,{container:!0,sx:{gap:{xs:"1rem",sx:"1rem",md:"0px",lg:"0px"}},children:[(0,d.jsx)(a.Ay,{item:!0,xs:12,md:3,lg:3,sm:12,sx:{padding:"0px !important",display:"flex",alignItems:"center"},children:(0,d.jsx)("h2",{style:{color:x.palette.common.black,margin:"0px"},children:n})}),(0,d.jsx)(a.Ay,{item:!0,xs:12,md:9,lg:9,sm:12,sx:{padding:"0px !important"},children:(0,d.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"end"},children:[(0,d.jsxs)(l.A,{sx:{position:"relative",padding:c?"0px":"0.5rem",background:"white",borderRadius:"5px",display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,d.jsx)(l.A,{sx:{p:{sm:x.spacing(.75,1.25),xs:x.spacing(1.25)},position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",color:x.palette.common.black,height:"100%"},children:(0,d.jsx)(s.A,{})}),(0,d.jsx)(r.Ay,{placeholder:t,sx:{marginLeft:"2.3rem","& .MuiInputBase-root":{color:x.palette.common.black,mr:3,display:"flex",alignItems:"center"},"& .MuiInputBase-input":{p:x.spacing(1,1,1,0),pl:"calc(1em + ".concat(x.spacing(4),")"),transition:x.transitions.create("width"),color:x.palette.common.black,width:{sm:"100%",md:45},mr:{md:3},"&:focus":{width:{md:225}}}},inputProps:{"aria-label":"search"},onChange:e=>u(e.target.value)})]}),c?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:p,style:{backgroundColor:x.palette.success.main,textTransform:"capitalize",color:x.palette.common.white,":hover":{backgroundColor:x.palette.success.dark}},children:c})}):"",g?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:v,style:{backgroundColor:x.palette.warning.main,textTransform:"capitalize",color:x.palette.common.white,":hover":{backgroundColor:x.palette.warning.dark}},children:"Clear Filter"})}):""]})})]})}},3691:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>w});var a=n(5043),o=n(7392),l=n(1906),r=n(3825),i=n(3216),s=n(431),d=n(184),c=n(1935),u=n(1944),p=n(7863),g=n(4356),v=n(3003),x=n(7439),m=n(6240),h=n(4150),f=n(91),b=n(1462),y=n(2450),j=n(579);const w=function(e){let{permission:t}=e;const n=(0,i.Zp)(),w=(0,v.wA)(),C=(0,m.A)(),[k,A]=(0,a.useState)([]),[R,S]=(0,a.useState)(5),[T,_]=(0,a.useState)(1),[I,P]=(0,a.useState)(0),[B,L]=(0,a.useState)({sortField:"category_name",sortBy:"asc"}),E=async e=>{try{var t;let g={...B};delete g.sortBy,delete g.sortField;let j={limit:R,page:T,sortBy:B.sortField,sortOrder:B.sortBy,...g};e&&(j.search=e);const C=new URLSearchParams(j).toString();w((0,c.vL)());const k=await p.A.get("".concat(u.A.Categories.GET_LIST,"?").concat(C));var n,a,o,l,r,i,s,d,v,x,m,h,f,b,y;if(null!==(t=k.data)&&void 0!==t&&t.payload)_(null===(n=k.data)||void 0===n||null===(a=n.payload)||void 0===a||null===(o=a.result)||void 0===o||null===(l=o.meta)||void 0===l?void 0:l.currentPage),S(null===(r=k.data)||void 0===r||null===(i=r.payload)||void 0===i||null===(s=i.result)||void 0===s||null===(d=s.meta)||void 0===d?void 0:d.limit),P(null===(v=k.data)||void 0===v||null===(x=v.payload)||void 0===x||null===(m=x.result)||void 0===m||null===(h=m.meta)||void 0===h?void 0:h.docsFound),A(null===(f=k.data)||void 0===f||null===(b=f.payload)||void 0===b||null===(y=b.result)||void 0===y?void 0:y.data);w((0,c.xv)())}catch(k){var j,C;console.log(k),(0,g.f1)(null===k||void 0===k||null===(j=k.response)||void 0===j||null===(C=j.data)||void 0===C?void 0:C.message),w((0,c.xv)())}},F=((e,t)=>{const n=(0,a.useRef)(null),o=(0,a.useCallback)((function(){for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];n.current&&clearTimeout(n.current),n.current=setTimeout((()=>{e(...o)}),t)}),[e,t]);return o})(E,500);return(0,a.useEffect)((()=>{E()}),[]),(0,a.useEffect)((()=>{E()}),[B,R,T]),(0,j.jsxs)("div",{children:[(0,j.jsx)(x.A,{addText:null!==t&&void 0!==t&&t.can_add?"Add Category":null,title:"Categories",searchText:"Search by name or description",handleAdd:()=>n("/category/add"),handleSearch:e=>{F(e)},isClear:!0,onClear:()=>{L({sortField:"category_name",sortBy:"asc"})}}),(0,j.jsx)("div",{style:{width:"100%",marginTop:"1rem"},children:(0,j.jsxs)("div",{style:{fontWeight:"bold",color:C.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,j.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,j.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Category Name",(0,j.jsx)(h.A,{name:"category_name",icon:null!==B&&void 0!==B&&B.sortField&&"category_name"===B.sortField&&"asc"!==B.sortBy?(0,j.jsx)(b.hIM,{color:C.palette.common.black,size:15}):(0,j.jsx)(b.wyk,{color:C.palette.common.black,size:15}),onSelect:(e,t)=>{L("category_name"===e?{sortBy:t,sortField:e}:{[e]:t})},options:f.I1})]}),(0,j.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Action"})]})}),k.length>0?k.map(((e,a)=>(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,j.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:R*(T-1)+a+1}),(0,j.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.category_name}),(0,j.jsxs)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[null!==t&&void 0!==t&&t.can_read?(0,j.jsx)(o.A,{size:"small",onClick:()=>{return t=e._id,void n("/category/view/".concat(t));var t},style:{color:C.palette.info.main},children:(0,j.jsx)(d.Ny1,{})}):null,null!==t&&void 0!==t&&t.can_update?(0,j.jsx)(o.A,{size:"small",onClick:()=>{return t=e._id,void n("/category/edit/".concat(t));var t},style:{color:C.palette.warning.main},children:(0,j.jsx)(r.EaJ,{})}):null]})]},e._id))):(0,j.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:"No Category Found"}),(0,j.jsx)(s.A,{currentPage:T,totalItems:I,itemsPerPage:R,onPageChange:_,onItemsPerPageChange:S}),(0,j.jsx)("div",{style:{marginTop:"1rem",display:"flex",justifyContent:"end"},children:(0,j.jsx)(l.A,{variant:"contained",onClick:async()=>{try{w((0,c.vL)());const e=await p.A.get(u.A.Categories.DOWNLOAD_EXCEL,{responseType:"blob"}),t=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,y.saveAs)(t,"categories.xlsx"),w((0,c.xv)())}catch(n){var e,t;console.log(n),(0,g.f1)(null===n||void 0===n||null===(e=n.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message),w((0,c.xv)())}},style:{backgroundColor:C.palette.success.main,textTransform:"capitalize",color:C.palette.common.white,":hover":{backgroundColor:C.palette.success.dark}},children:"Download Excel Sheet"})})]})}},7863:(e,t,n)=>{"use strict";n.d(t,{A:()=>c});var a=n(6213),o=n(1944),l=n(790),r=n(8402);const i=a.A.create({baseURL:o.A.base_url,timeout:1e4,headers:{Accept:"application/json, application/octet-stream"},withCredentials:!1});let s=!1,d=[];i.interceptors.request.use((e=>{const t=localStorage.getItem(l.o.localStorageKeys.token);return t&&(e.headers.Authorization="Bearer ".concat(t),e.withCredentials=!0),e}),(e=>Promise.reject(e))),i.interceptors.response.use((e=>e),(e=>{const{config:t,response:n}=e,a=t;if("Token has expired"===n.data.message){if(!s){s=!0;const t=localStorage.getItem(l.o.localStorageKeys.refresh_token);return i.post(o.A.refresh_token_url,{refreshToken:t}).then((e=>{var t;let{data:n}=e;const o=null===n||void 0===n||null===(t=n.payload)||void 0===t?void 0:t.accessToken;var r;return localStorage.setItem(l.o.localStorageKeys.token,o),s=!1,r=o,d.forEach((e=>e(r))),d=[],a.headers.Authorization="Bearer ".concat(o),i(a)})).catch((t=>(console.error("Failed to refresh token:",t),(0,r.sw)(),window.location.href=o.A.login_path,Promise.reject(e))))}return new Promise((e=>{var t;t=t=>{a.headers.Authorization="Bearer ".concat(t),e(i(a))},d.push(t)}))}return"Token is invalid"===n.data.message&&((0,r.sw)(),window.location.href=o.A.login_path),Promise.reject(e)}));const c=i},91:(e,t,n)=>{"use strict";n.d(t,{$w:()=>g,I1:()=>a,Lw:()=>i,Rr:()=>r,aB:()=>d,bx:()=>o,jH:()=>p,qR:()=>c,qi:()=>s,wX:()=>u,yl:()=>l});const a=[{label:"Sort A to Z",value:"asc"},{label:"Sort Z to A",value:"desc"}],o=[{label:"Active",value:!0},{label:"Inactive",value:!1}],l=[{label:"Unverified",value:!1},{label:"verified",value:!0}],r=[{label:"Newest First",value:"desc"},{label:"Oldest First",value:"asc"}],i=[{label:"Highest First",value:"desc"},{label:"Lowest First",value:"asc"}],s=[{label:"Pending",value:"pending"},{label:"Confirm",value:"confirm"},{label:"Reject",value:"rejected"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"},{label:"Return Requested",value:"return_requested"},{label:"Return Accepeted",value:"return_accepeted"},{label:"Return Rejected",value:"return_rejected"},{label:"Return Fulfilled",value:"return_fulfilled"}],d=[{label:"Credit",value:"credit"},{label:"Debit",value:"debit"}],c=[{label:"Unpaid",value:"unpaid"},{label:"Paid",value:"paid"}],u=[{label:"Cash",value:"cash"},{label:"Online",value:"online"}],p=[{label:"Percentage",value:"percentage"},{label:"Fixed Amount",value:"fixed_amount"},{label:"Tiered",value:"tiered"},{label:"Buy X Get Y",value:"buy_x_get_y"},{label:"Bundle",value:"bundle"},{label:"Referral",value:"referral"},{label:"Coupon",value:"coupon"}],g=[{label:"Percentage",value:"percentage"},{label:"Amount",value:"amount"}]},4356:(e,t,n)=>{"use strict";n.d(t,{f1:()=>r,uT:()=>l});var a=n(1036);n(2342);const o={position:"top-center",closeButton:!1,progress:!1},l=e=>{a.oR.success(e,o)},r=e=>{a.oR.error(e,o)}},2450:function(e,t,n){var a,o,l;o=[],void 0===(l="function"===typeof(a=function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function a(e,t,n){var a=new XMLHttpRequest;a.open("GET",e),a.responseType="blob",a.onload=function(){s(a.response,t,n)},a.onerror=function(){console.error("could not download file")},a.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function l(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n.g&&n.g.global===n.g?n.g:void 0,i=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(e,t,n){var i=r.URL||r.webkitURL,s=document.createElement("a");t=t||e.name||"download",s.download=t,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?l(s):o(s.href)?a(e,t,n):l(s,s.target="_blank")):(s.href=i.createObjectURL(e),setTimeout((function(){i.revokeObjectURL(s.href)}),4e4),setTimeout((function(){l(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,r){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,r),n);else if(o(e))a(e,n,r);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){l(i)}))}}:function(e,t,n,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof e)return a(e,t,n);var l="application/octet-stream"===e.type,s=/constructor/i.test(r.HTMLElement)||r.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||l&&s||i)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=e:location=e,o=null},c.readAsDataURL(e)}else{var u=r.URL||r.webkitURL,p=u.createObjectURL(e);o?o.location=p:location.href=p,o=null,setTimeout((function(){u.revokeObjectURL(p)}),4e4)}});r.saveAs=s.saveAs=s,e.exports=s})?a.apply(t,o):a)||(e.exports=l)}}]);
//# sourceMappingURL=3855.03fe1732.chunk.js.map