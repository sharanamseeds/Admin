(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[3855],{8912:(e,t,a)=>{"use strict";a.d(t,{A:()=>d});var l=a(5043),n=a(7392),o=a(3321),r=a(2143),i=a(8734),s=a(579);const d=e=>{let{icon:t,onSelect:a,name:d,options:c,value:u=""}=e;const[p,v]=l.useState(null),g=()=>{v(null)},m=e=>!1===u&&!1===e||(e===u||(null===e||void 0===e?void 0:e.toString())===(null===u||void 0===u?void 0:u.toString()));return(0,s.jsxs)("div",{style:{position:"relative"},children:[(0,s.jsx)(n.A,{onClick:e=>{v(e.currentTarget)},children:t}),(0,s.jsx)(o.A,{anchorEl:p,open:Boolean(p),onClose:g,children:null===c||void 0===c?void 0:c.map(((e,t)=>(0,s.jsx)(r.A,{onClick:()=>{return t=e.value,g(),void a(d,t);var t},selected:m(e.value),children:(0,s.jsx)(i.A,{primary:e.label,style:{fontWeight:m(e.value)?"bold":"normal"}})},t)))})]})}},431:(e,t,a)=>{"use strict";a.d(t,{A:()=>n});a(5043);var l=a(579);const n=e=>{let{currentPage:t,totalItems:a,itemsPerPage:n,onPageChange:o,onItemsPerPageChange:r}=e;const i=e=>{e<1||e>s||o(e)},s=Math.ceil(a/n),d=(()=>{if(s>7){let e,a;return t<=3?(e=1,a=5):t+2>=s?(e=s-4,a=s):(e=t-2,a=t+2),Array.from({length:a-e+1},((t,a)=>e+a))}return Array.from({length:s},((e,t)=>t+1))})();return(0,l.jsx)(l.Fragment,{children:s>1&&(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",backgroundColor:"#f4f6f8",borderRadius:"10px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",marginTop:"20px"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,l.jsx)("button",{onClick:()=>i(1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xab"}),(0,l.jsx)("button",{onClick:()=>i(t-1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u2039"}),d[0]>1&&(0,l.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),d.map((e=>(0,l.jsx)("button",{onClick:()=>i(e),style:{backgroundColor:e===t?"#e0e0e0":"white",fontWeight:e===t?"bold":"normal",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer",hover:{backgroundColor:"#f0f0f0"}},children:e},e))),d[d.length-1]<s&&(0,l.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),(0,l.jsx)("button",{onClick:()=>i(t+1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u203a"}),(0,l.jsx)("button",{onClick:()=>i(s),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xbb"})]}),(0,l.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,l.jsxs)("select",{id:"itemsPerPage",value:n,onChange:e=>{o(1),r(Number(e.target.value))},style:{padding:"5px",marginLeft:"10px",borderRadius:"5px",border:"1px solid #ddd",cursor:"pointer"},children:[(0,l.jsx)("option",{value:5,children:"5"}),(0,l.jsx)("option",{value:10,children:"10"}),(0,l.jsx)("option",{value:50,children:"50"})]})})]})})}},7439:(e,t,a)=>{"use strict";a.d(t,{A:()=>c});var l=a(8903),n=(a(5043),a(6240)),o=a(6446),r=a(2559),i=a(1906),s=a(4324),d=a(579);const c=function(e){let{searchText:t="Search",title:a="Table",addText:c,handleSearch:u=e=>{},handleAdd:p=()=>{},isClear:v=!1,onClear:g=()=>{}}=e;const m=(0,n.A)();return(0,d.jsxs)(l.Ay,{container:!0,sx:{gap:{xs:"1rem",sx:"1rem",md:"0px",lg:"0px"}},children:[(0,d.jsx)(l.Ay,{item:!0,xs:12,md:3,lg:3,sm:12,sx:{padding:"0px !important",display:"flex",alignItems:"center"},children:(0,d.jsx)("h2",{style:{color:m.palette.common.black,margin:"0px"},children:a})}),(0,d.jsx)(l.Ay,{item:!0,xs:12,md:9,lg:9,sm:12,sx:{padding:"0px !important"},children:(0,d.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"end"},children:[(0,d.jsxs)(o.A,{sx:{position:"relative",padding:c?"0px":"0.5rem",background:"white",borderRadius:"5px",display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,d.jsx)(o.A,{sx:{p:{sm:m.spacing(.75,1.25),xs:m.spacing(1.25)},position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",color:m.palette.common.black,height:"100%"},children:(0,d.jsx)(s.A,{})}),(0,d.jsx)(r.Ay,{placeholder:t,sx:{marginLeft:"2.3rem","& .MuiInputBase-root":{color:m.palette.common.black,mr:3,display:"flex",alignItems:"center"},"& .MuiInputBase-input":{p:m.spacing(1,1,1,0),pl:"calc(1em + ".concat(m.spacing(4),")"),transition:m.transitions.create("width"),color:m.palette.common.black,width:{sm:"100%",md:45},mr:{md:3},"&:focus":{width:{md:225}}}},inputProps:{"aria-label":"search"},onChange:e=>u(e.target.value)})]}),c?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:p,style:{backgroundColor:m.palette.success.main,textTransform:"capitalize",color:m.palette.common.white,":hover":{backgroundColor:m.palette.success.dark}},children:c})}):"",v?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:g,style:{backgroundColor:m.palette.warning.main,textTransform:"capitalize",color:m.palette.common.white,":hover":{backgroundColor:m.palette.warning.dark}},children:"Clear Filter"})}):""]})})]})}},3691:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>w});var l=a(5043),n=a(7392),o=a(1906),r=a(3825),i=a(3216),s=a(431),d=a(184),c=a(1935),u=a(1944),p=a(7863),v=a(4356),g=a(3003),m=a(7439),x=a(6240),h=a(8912),f=a(91),b=a(1462),y=a(2450),j=a(579);const w=function(e){let{permission:t}=e;const a=(0,i.Zp)(),w=(0,g.wA)(),C=(0,x.A)(),[A,k]=(0,l.useState)([]),[R,S]=(0,l.useState)(5),[T,_]=(0,l.useState)(1),[L,I]=(0,l.useState)(0),[B,P]=(0,l.useState)({sortField:"category_name",sortBy:"asc"}),E=async e=>{try{var t;let v={...B};delete v.sortBy,delete v.sortField;let j={limit:R,page:T,sortBy:B.sortField,sortOrder:B.sortBy,...v};e&&(j.search=e);const C=new URLSearchParams(j).toString();w((0,c.vL)());const A=await p.A.get("".concat(u.A.Categories.GET_LIST,"?").concat(C));var a,l,n,o,r,i,s,d,g,m,x,h,f,b,y;if(null!==(t=A.data)&&void 0!==t&&t.payload)_(null===(a=A.data)||void 0===a||null===(l=a.payload)||void 0===l||null===(n=l.result)||void 0===n||null===(o=n.meta)||void 0===o?void 0:o.currentPage),S(null===(r=A.data)||void 0===r||null===(i=r.payload)||void 0===i||null===(s=i.result)||void 0===s||null===(d=s.meta)||void 0===d?void 0:d.limit),I(null===(g=A.data)||void 0===g||null===(m=g.payload)||void 0===m||null===(x=m.result)||void 0===x||null===(h=x.meta)||void 0===h?void 0:h.docsFound),k(null===(f=A.data)||void 0===f||null===(b=f.payload)||void 0===b||null===(y=b.result)||void 0===y?void 0:y.data);w((0,c.xv)())}catch(A){var j,C;console.log(A),(0,v.f1)(null===A||void 0===A||null===(j=A.response)||void 0===j||null===(C=j.data)||void 0===C?void 0:C.message),w((0,c.xv)())}},F=((e,t)=>{const a=(0,l.useRef)(null),n=(0,l.useCallback)((function(){for(var l=arguments.length,n=new Array(l),o=0;o<l;o++)n[o]=arguments[o];a.current&&clearTimeout(a.current),a.current=setTimeout((()=>{e(...n)}),t)}),[e,t]);return n})(E,500);return(0,l.useEffect)((()=>{E()}),[]),(0,l.useEffect)((()=>{E()}),[B,R,T]),(0,j.jsxs)("div",{children:[(0,j.jsx)(m.A,{addText:null!==t&&void 0!==t&&t.can_add?"Add Category":null,title:"Categories",searchText:"Search by name or description",handleAdd:()=>a("/category/add"),handleSearch:e=>{F(e)},isClear:!0,onClear:()=>{P({sortField:"category_name",sortBy:"asc"})}}),(0,j.jsx)("div",{style:{width:"100%",marginTop:"1rem"},children:(0,j.jsxs)("div",{style:{fontWeight:"bold",color:C.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,j.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,j.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Category Name",(0,j.jsx)(h.A,{name:"category_name",icon:null!==B&&void 0!==B&&B.sortField&&"category_name"===B.sortField&&"asc"!==B.sortBy?(0,j.jsx)(b.hIM,{color:C.palette.common.black,size:15}):(0,j.jsx)(b.wyk,{color:C.palette.common.black,size:15}),onSelect:(e,t)=>{P("category_name"===e?{sortBy:t,sortField:e}:{[e]:t})},options:f.I1,value:null!==B&&void 0!==B&&B.sortField&&"category_name"===B.sortField?B.sortBy:""})]}),(0,j.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Action"})]})}),A.length>0?A.map(((e,l)=>(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,j.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:R*(T-1)+l+1}),(0,j.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.category_name}),(0,j.jsxs)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[null!==t&&void 0!==t&&t.can_read?(0,j.jsx)(n.A,{size:"small",onClick:()=>{return t=e._id,void a("/category/view/".concat(t));var t},style:{color:C.palette.info.main},children:(0,j.jsx)(d.Ny1,{})}):null,null!==t&&void 0!==t&&t.can_update?(0,j.jsx)(n.A,{size:"small",onClick:()=>{return t=e._id,void a("/category/edit/".concat(t));var t},style:{color:C.palette.warning.main},children:(0,j.jsx)(r.EaJ,{})}):null]})]},e._id))):(0,j.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:"No Category Found"}),(0,j.jsx)(s.A,{currentPage:T,totalItems:L,itemsPerPage:R,onPageChange:_,onItemsPerPageChange:S}),(0,j.jsx)("div",{style:{marginTop:"1rem",display:"flex",justifyContent:"end"},children:(0,j.jsx)(o.A,{variant:"contained",onClick:async()=>{try{w((0,c.vL)());const e=await p.A.get(u.A.Categories.DOWNLOAD_EXCEL,{responseType:"blob"}),t=new Blob([e.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,y.saveAs)(t,"categories.xlsx"),w((0,c.xv)())}catch(a){var e,t;console.log(a),(0,v.f1)(null===a||void 0===a||null===(e=a.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message),w((0,c.xv)())}},style:{backgroundColor:C.palette.success.main,textTransform:"capitalize",color:C.palette.common.white,":hover":{backgroundColor:C.palette.success.dark}},children:"Download Excel Sheet"})})]})}},7863:(e,t,a)=>{"use strict";a.d(t,{A:()=>c});var l=a(6213),n=a(1944),o=a(790),r=a(8402);const i=l.A.create({baseURL:n.A.base_url,timeout:1e4,headers:{Accept:"application/json, application/octet-stream"},withCredentials:!1});let s=!1,d=[];i.interceptors.request.use((e=>{const t=localStorage.getItem(o.o.localStorageKeys.token);return t&&(e.headers.Authorization="Bearer ".concat(t),e.withCredentials=!0),e}),(e=>Promise.reject(e))),i.interceptors.response.use((e=>e),(e=>{const{config:t,response:a}=e,l=t;if("Token has expired"===a.data.message){if(!s){s=!0;const t=localStorage.getItem(o.o.localStorageKeys.refresh_token);return i.post(n.A.refresh_token_url,{refreshToken:t}).then((e=>{var t;let{data:a}=e;const n=null===a||void 0===a||null===(t=a.payload)||void 0===t?void 0:t.accessToken;var r;return localStorage.setItem(o.o.localStorageKeys.token,n),s=!1,r=n,d.forEach((e=>e(r))),d=[],l.headers.Authorization="Bearer ".concat(n),i(l)})).catch((t=>(console.error("Failed to refresh token:",t),(0,r.sw)(),window.location.href=n.A.login_path,Promise.reject(e))))}return new Promise((e=>{var t;t=t=>{l.headers.Authorization="Bearer ".concat(t),e(i(l))},d.push(t)}))}return"Token is invalid"===a.data.message&&((0,r.sw)(),window.location.href=n.A.login_path),Promise.reject(e)}));const c=i},91:(e,t,a)=>{"use strict";a.d(t,{$w:()=>m,I1:()=>l,Lw:()=>s,Rr:()=>i,aB:()=>c,bx:()=>n,cK:()=>v,jH:()=>g,qR:()=>u,qi:()=>d,tG:()=>r,wX:()=>p,yl:()=>o});const l=[{label:"Sort A to Z",value:"asc"},{label:"Sort Z to A",value:"desc"}],n=[{label:"Active",value:!0},{label:"Inactive",value:!1}],o=[{label:"Unverified",value:!1},{label:"verified",value:!0}],r=[{label:"App User",value:!0},{label:"Admin",value:!1}],i=[{label:"Newest First",value:"desc"},{label:"Oldest First",value:"asc"}],s=[{label:"Highest First",value:"desc"},{label:"Lowest First",value:"asc"}],d=[{label:"Pending",value:"pending"},{label:"Confirm",value:"confirm"},{label:"Reject",value:"rejected"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"},{label:"Return Requested",value:"return_requested"},{label:"Return Accepeted",value:"return_accepeted"},{label:"Return Rejected",value:"return_rejected"},{label:"Return Fulfilled",value:"return_fulfilled"}],c=[{label:"Credit",value:"credit"},{label:"Debit",value:"debit"}],u=[{label:"Unpaid",value:"unpaid"},{label:"Paid",value:"paid"}],p=[{label:"Cash",value:"cash"},{label:"Online",value:"online"}],v=[{label:"GM",value:"GM"},{label:"ML",value:"ML"},{label:"KG",value:"KG"},{label:"LTR",value:"LTR"}],g=[{label:"Percentage",value:"percentage"},{label:"Fixed Amount",value:"fixed_amount"},{label:"Tiered",value:"tiered"},{label:"Buy X Get Y",value:"buy_x_get_y"},{label:"Bundle",value:"bundle"},{label:"Referral",value:"referral"},{label:"Coupon",value:"coupon"}],m=[{label:"Percentage",value:"percentage"},{label:"Amount",value:"amount"}]},4356:(e,t,a)=>{"use strict";a.d(t,{f1:()=>r,uT:()=>o});var l=a(1036);a(2342);const n={position:"top-center",closeButton:!1,progress:!1},o=e=>{l.oR.success(e,n)},r=e=>{l.oR.error(e,n)}},4324:(e,t,a)=>{"use strict";var l=a(4994);t.A=void 0;var n=l(a(39)),o=a(579);t.A=(0,n.default)((0,o.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"SearchTwoTone")},2450:function(e,t,a){var l,n,o;n=[],void 0===(o="function"===typeof(l=function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function l(e,t,a){var l=new XMLHttpRequest;l.open("GET",e),l.responseType="blob",l.onload=function(){s(l.response,t,a)},l.onerror=function(){console.error("could not download file")},l.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function o(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(l){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var r="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof a.g&&a.g.global===a.g?a.g:void 0,i=r.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),s=r.saveAs||("object"!=typeof window||window!==r?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(e,t,a){var i=r.URL||r.webkitURL,s=document.createElement("a");t=t||e.name||"download",s.download=t,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?o(s):n(s.href)?l(e,t,a):o(s,s.target="_blank")):(s.href=i.createObjectURL(e),setTimeout((function(){i.revokeObjectURL(s.href)}),4e4),setTimeout((function(){o(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,a,r){if(a=a||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,r),a);else if(n(e))l(e,a,r);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){o(i)}))}}:function(e,t,a,n){if((n=n||open("","_blank"))&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof e)return l(e,t,a);var o="application/octet-stream"===e.type,s=/constructor/i.test(r.HTMLElement)||r.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||o&&s||i)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=e:location=e,n=null},c.readAsDataURL(e)}else{var u=r.URL||r.webkitURL,p=u.createObjectURL(e);n?n.location=p:location.href=p,n=null,setTimeout((function(){u.revokeObjectURL(p)}),4e4)}});r.saveAs=s.saveAs=s,e.exports=s})?l.apply(t,n):l)||(e.exports=o)}}]);
//# sourceMappingURL=3855.744e9e6d.chunk.js.map