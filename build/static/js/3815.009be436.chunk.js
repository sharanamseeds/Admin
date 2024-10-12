"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[3815],{8951:(e,l,a)=>{a.d(l,{A:()=>I});var t=a(5043),n=a(6240),r=a(8587),o=a(8168),i=a(8387),s=a(8610),d=a(5844),c=a(6803),p=a(3062),u=a(6258),x=a(3336),m=a(8206),g=a(4535),h=a(2532),v=a(2372);function b(e){return(0,v.Ay)("MuiDialog",e)}const y=(0,h.A)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);const f=t.createContext({});var A=a(2220),j=a(579);const C=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],k=(0,g.Ay)(A.A,{name:"MuiDialog",slot:"Backdrop",overrides:(e,l)=>l.backdrop})({zIndex:-1}),w=(0,g.Ay)(p.A,{name:"MuiDialog",slot:"Root",overridesResolver:(e,l)=>l.root})({"@media print":{position:"absolute !important"}}),S=(0,g.Ay)("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,l)=>{const{ownerState:a}=e;return[l.container,l["scroll".concat((0,c.A)(a.scroll))]]}})((e=>{let{ownerState:l}=e;return(0,o.A)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===l.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===l.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),P=(0,g.Ay)(x.A,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,l)=>{const{ownerState:a}=e;return[l.paper,l["scrollPaper".concat((0,c.A)(a.scroll))],l["paperWidth".concat((0,c.A)(String(a.maxWidth)))],a.fullWidth&&l.paperFullWidth,a.fullScreen&&l.paperFullScreen]}})((e=>{let{theme:l,ownerState:a}=e;return(0,o.A)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===a.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===a.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===a.maxWidth&&{maxWidth:"px"===l.breakpoints.unit?Math.max(l.breakpoints.values.xs,444):"max(".concat(l.breakpoints.values.xs).concat(l.breakpoints.unit,", 444px)"),["&.".concat(y.paperScrollBody)]:{[l.breakpoints.down(Math.max(l.breakpoints.values.xs,444)+64)]:{maxWidth:"calc(100% - 64px)"}}},a.maxWidth&&"xs"!==a.maxWidth&&{maxWidth:"".concat(l.breakpoints.values[a.maxWidth]).concat(l.breakpoints.unit),["&.".concat(y.paperScrollBody)]:{[l.breakpoints.down(l.breakpoints.values[a.maxWidth]+64)]:{maxWidth:"calc(100% - 64px)"}}},a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,["&.".concat(y.paperScrollBody)]:{margin:0,maxWidth:"100%"}})})),W=t.forwardRef((function(e,l){const a=(0,m.b)({props:e,name:"MuiDialog"}),p=(0,n.A)(),g={enter:p.transitions.duration.enteringScreen,exit:p.transitions.duration.leavingScreen},{"aria-describedby":h,"aria-labelledby":v,BackdropComponent:y,BackdropProps:A,children:W,className:_,disableEscapeKeyDown:B=!1,fullScreen:I=!1,fullWidth:R=!1,maxWidth:T="sm",onBackdropClick:F,onClick:L,onClose:M,open:D,PaperComponent:E=x.A,PaperProps:z={},scroll:N="paper",TransitionComponent:K=u.A,transitionDuration:G=g,TransitionProps:H}=a,q=(0,r.A)(a,C),U=(0,o.A)({},a,{disableEscapeKeyDown:B,fullScreen:I,fullWidth:R,maxWidth:T,scroll:N}),X=(e=>{const{classes:l,scroll:a,maxWidth:t,fullWidth:n,fullScreen:r}=e,o={root:["root"],container:["container","scroll".concat((0,c.A)(a))],paper:["paper","paperScroll".concat((0,c.A)(a)),"paperWidth".concat((0,c.A)(String(t))),n&&"paperFullWidth",r&&"paperFullScreen"]};return(0,s.A)(o,b,l)})(U),Y=t.useRef(),O=(0,d.A)(v),Z=t.useMemo((()=>({titleId:O})),[O]);return(0,j.jsx)(w,(0,o.A)({className:(0,i.A)(X.root,_),closeAfterTransition:!0,components:{Backdrop:k},componentsProps:{backdrop:(0,o.A)({transitionDuration:G,as:y},A)},disableEscapeKeyDown:B,onClose:M,open:D,ref:l,onClick:e=>{L&&L(e),Y.current&&(Y.current=null,F&&F(e),M&&M(e,"backdropClick"))},ownerState:U},q,{children:(0,j.jsx)(K,(0,o.A)({appear:!0,in:D,timeout:G,role:"presentation"},H,{children:(0,j.jsx)(S,{className:(0,i.A)(X.container),onMouseDown:e=>{Y.current=e.target===e.currentTarget},ownerState:U,children:(0,j.jsx)(P,(0,o.A)({as:E,elevation:24,role:"dialog","aria-describedby":h,"aria-labelledby":O},z,{className:(0,i.A)(X.paper,z.className),ownerState:U,children:(0,j.jsx)(f.Provider,{value:Z,children:W})}))})}))}))}));var _=a(8903),B=a(1906);const I=e=>{let{open:l,onClose:a,message:t,onConfirm:r}=e;const o=(0,n.A)();return(0,j.jsx)(W,{open:l,onClose:a,"aria-labelledby":"confirmation-dialog-title","aria-describedby":"confirmation-dialog-description",children:(0,j.jsxs)("div",{style:{padding:"1rem 2rem"},children:[(0,j.jsx)("h4",{style:{margin:"0px",textAlign:"center"},children:"Confirm Action"}),(0,j.jsx)("p",{children:t}),(0,j.jsxs)(_.Ay,{container:!0,justifyContent:"flex-end",spacing:2,style:{marginBottom:"0.5rem"},children:[(0,j.jsx)(_.Ay,{item:!0,children:(0,j.jsx)(B.A,{variant:"contained",sx:{color:o.palette.common.white,width:"max-content",backgroundColor:o.palette.error.main,"&:hover":{backgroundColor:o.palette.error.main}},onClick:a,children:"Cancel"})}),(0,j.jsx)(_.Ay,{item:!0,children:(0,j.jsx)(B.A,{fullWidth:!0,variant:"contained",onClick:()=>{r(),a()},sx:{color:o.palette.common.white,width:"max-content",backgroundColor:o.palette.success.main,"&:hover":{backgroundColor:o.palette.success.main}},children:"Confirm"})})]})]})})}},8912:(e,l,a)=>{a.d(l,{A:()=>d});var t=a(5043),n=a(7392),r=a(3321),o=a(2143),i=a(8734),s=a(579);const d=e=>{let{icon:l,onSelect:a,name:d,options:c,value:p=""}=e;const[u,x]=t.useState(null),m=()=>{x(null)},g=e=>!1===p&&!1===e||(e===p||(null===e||void 0===e?void 0:e.toString())===(null===p||void 0===p?void 0:p.toString()));return(0,s.jsxs)("div",{style:{position:"relative"},children:[(0,s.jsx)(n.A,{onClick:e=>{x(e.currentTarget)},children:l}),(0,s.jsx)(r.A,{anchorEl:u,open:Boolean(u),onClose:m,children:null===c||void 0===c?void 0:c.map(((e,l)=>(0,s.jsx)(o.A,{onClick:()=>{return l=e.value,m(),void a(d,l);var l},selected:g(e.value),children:(0,s.jsx)(i.A,{primary:e.label,style:{fontWeight:g(e.value)?"bold":"normal"}})},l)))})]})}},431:(e,l,a)=>{a.d(l,{A:()=>n});a(5043);var t=a(579);const n=e=>{let{currentPage:l,totalItems:a,itemsPerPage:n,onPageChange:r,onItemsPerPageChange:o}=e;const i=e=>{e<1||e>s||r(e)},s=Math.ceil(a/n),d=(()=>{if(s>7){let e,a;return l<=3?(e=1,a=5):l+2>=s?(e=s-4,a=s):(e=l-2,a=l+2),Array.from({length:a-e+1},((l,a)=>e+a))}return Array.from({length:s},((e,l)=>l+1))})();return(0,t.jsx)(t.Fragment,{children:s>1&&(0,t.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",backgroundColor:"#f4f6f8",borderRadius:"10px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",marginTop:"20px"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,t.jsx)("button",{onClick:()=>i(1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xab"}),(0,t.jsx)("button",{onClick:()=>i(l-1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u2039"}),d[0]>1&&(0,t.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),d.map((e=>(0,t.jsx)("button",{onClick:()=>i(e),style:{backgroundColor:e===l?"#e0e0e0":"white",fontWeight:e===l?"bold":"normal",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer",hover:{backgroundColor:"#f0f0f0"}},children:e},e))),d[d.length-1]<s&&(0,t.jsx)("span",{style:{padding:"5px 10px"},children:"..."}),(0,t.jsx)("button",{onClick:()=>i(l+1),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\u203a"}),(0,t.jsx)("button",{onClick:()=>i(s),style:{backgroundColor:"white",border:"1px solid #ddd",padding:"5px 10px",margin:"0 5px",borderRadius:"5px",cursor:"pointer"},children:"\xbb"})]}),(0,t.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,t.jsxs)("select",{id:"itemsPerPage",value:n,onChange:e=>{r(1),o(Number(e.target.value))},style:{padding:"5px",marginLeft:"10px",borderRadius:"5px",border:"1px solid #ddd",cursor:"pointer"},children:[(0,t.jsx)("option",{value:5,children:"5"}),(0,t.jsx)("option",{value:10,children:"10"}),(0,t.jsx)("option",{value:50,children:"50"})]})})]})})}},7439:(e,l,a)=>{a.d(l,{A:()=>c});var t=a(8903),n=(a(5043),a(6240)),r=a(6446),o=a(2559),i=a(1906),s=a(4324),d=a(579);const c=function(e){let{searchText:l="Search",title:a="Table",addText:c,handleSearch:p=e=>{},handleAdd:u=()=>{},isClear:x=!1,onClear:m=()=>{}}=e;const g=(0,n.A)();return(0,d.jsxs)(t.Ay,{container:!0,sx:{gap:{xs:"1rem",sx:"1rem",md:"0px",lg:"0px"}},children:[(0,d.jsx)(t.Ay,{item:!0,xs:12,md:3,lg:3,sm:12,sx:{padding:"0px !important",display:"flex",alignItems:"center"},children:(0,d.jsx)("h2",{style:{color:g.palette.common.black,margin:"0px"},children:a})}),(0,d.jsx)(t.Ay,{item:!0,xs:12,md:9,lg:9,sm:12,sx:{padding:"0px !important"},children:(0,d.jsxs)("div",{style:{display:"flex",gap:"1rem",justifyContent:"end"},children:[(0,d.jsxs)(r.A,{sx:{position:"relative",padding:c?"0px":"0.5rem",background:"white",borderRadius:"5px",display:"flex",gap:"0.5rem",alignItems:"center"},children:[(0,d.jsx)(r.A,{sx:{p:{sm:g.spacing(.75,1.25),xs:g.spacing(1.25)},position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",color:g.palette.common.black,height:"100%"},children:(0,d.jsx)(s.A,{})}),(0,d.jsx)(o.Ay,{placeholder:l,sx:{marginLeft:"2.3rem","& .MuiInputBase-root":{color:g.palette.common.black,mr:3,display:"flex",alignItems:"center"},"& .MuiInputBase-input":{p:g.spacing(1,1,1,0),pl:"calc(1em + ".concat(g.spacing(4),")"),transition:g.transitions.create("width"),color:g.palette.common.black,width:{sm:"100%",md:45},mr:{md:3},"&:focus":{width:{md:225}}}},inputProps:{"aria-label":"search"},onChange:e=>p(e.target.value)})]}),c?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:u,style:{backgroundColor:g.palette.success.main,textTransform:"capitalize",color:g.palette.common.white,":hover":{backgroundColor:g.palette.success.dark}},children:c})}):"",x?(0,d.jsx)("div",{children:(0,d.jsx)(i.A,{fullWidth:!0,variant:"contained",onClick:m,style:{backgroundColor:g.palette.warning.main,textTransform:"capitalize",color:g.palette.common.white,":hover":{backgroundColor:g.palette.warning.dark}},children:"Clear Filter"})}):""]})})]})}},6675:(e,l,a)=>{a.r(l),a.d(l,{default:()=>j});var t=a(5043),n=a(6240),r=a(7392),o=a(6720),i=a(3825),s=a(3216),d=a(184),c=a(431),p=a(1935),u=a(7863),x=a(1944),m=a(3003),g=a(4356),h=a(7439),v=a(8912),b=a(91),y=a(1462),f=a(8951),A=a(579);const j=function(e){let{permission:l}=e;const a=(0,s.Zp)(),j=(0,m.wA)(),C=(0,n.A)(),[k,w]=(0,t.useState)(1),[S,P]=(0,t.useState)(5),[W,_]=(0,t.useState)([]),[B,I]=(0,t.useState)(0),[R,T]=(0,t.useState)({sortField:"lang_name",sortBy:"asc"}),F=async e=>{try{var l;let g={...R};delete g.sortBy,delete g.sortField;let A={limit:S,page:k,sortBy:R.sortField,sortOrder:R.sortBy,...g};e&&(A.search=e);const C=new URLSearchParams(A).toString();j((0,p.vL)());const W=await u.A.get("".concat(x.A.Languages.GET_LIST,"?").concat(C));var a,t,n,r,o,i,s,d,c,m,h,v,b,y,f;if(null!==(l=W.data)&&void 0!==l&&l.payload)w(null===(a=W.data)||void 0===a||null===(t=a.payload)||void 0===t||null===(n=t.result)||void 0===n||null===(r=n.meta)||void 0===r?void 0:r.currentPage),P(null===(o=W.data)||void 0===o||null===(i=o.payload)||void 0===i||null===(s=i.result)||void 0===s||null===(d=s.meta)||void 0===d?void 0:d.limit),I(null===(c=W.data)||void 0===c||null===(m=c.payload)||void 0===m||null===(h=m.result)||void 0===h||null===(v=h.meta)||void 0===v?void 0:v.docsFound),_(null===(b=W.data)||void 0===b||null===(y=b.payload)||void 0===y||null===(f=y.result)||void 0===f?void 0:f.data);j((0,p.xv)())}catch(W){var A,C;console.log(W),(0,g.f1)(null===W||void 0===W||null===(A=W.response)||void 0===A||null===(C=A.data)||void 0===C?void 0:C.message),j((0,p.xv)())}},L=((e,l)=>{const a=(0,t.useRef)(null),n=(0,t.useCallback)((function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];a.current&&clearTimeout(a.current),a.current=setTimeout((()=>{e(...n)}),l)}),[e,l]);return n})(F,500),M=(e,l)=>{T("lang_name"===e||"lang_code"===e?{sortBy:l,sortField:e}:{[e]:l})},[D,E]=(0,t.useState)(!1),[z,N]=(0,t.useState)(null);return(0,t.useEffect)((()=>{F()}),[]),(0,t.useEffect)((()=>{F()}),[R,S,k]),(0,A.jsxs)("div",{children:[(0,A.jsx)(f.A,{open:D,onClose:()=>E(!1),message:"Are you sure you want to delete language?",onConfirm:()=>{(async e=>{try{var l;j((0,p.vL)());const a=await u.A.delete(x.A.Languages.DELETE_BY_ID+e);(0,g.uT)(null===a||void 0===a||null===(l=a.data)||void 0===l?void 0:l.message),j((0,p.xv)()),F()}catch(n){var a,t;console.log(n),(0,g.f1)(null===n||void 0===n||null===(a=n.response)||void 0===a||null===(t=a.data)||void 0===t?void 0:t.message),j((0,p.xv)())}})(z)}}),(0,A.jsx)(h.A,{addText:null!==l&&void 0!==l&&l.can_add?"Add Language":null,title:"Languages",searchText:"Search by language name",handleAdd:()=>a("/languages/add"),handleSearch:e=>{L(e)},isClear:!0,onClear:()=>{T({sortField:"lang_name",sortBy:"asc"})}}),(0,A.jsx)("div",{style:{width:"100%",marginTop:"1rem"},children:(0,A.jsxs)("div",{style:{fontWeight:"bold",color:C.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,A.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,A.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Language Name",(0,A.jsx)(v.A,{name:"lang_name",icon:null!==R&&void 0!==R&&R.sortField&&"lang_name"===R.sortField&&"asc"!==R.sortBy?(0,A.jsx)(y.hIM,{color:C.palette.common.black,size:15}):(0,A.jsx)(y.wyk,{color:C.palette.common.black,size:15}),onSelect:M,options:b.I1,value:null!==R&&void 0!==R&&R.sortField&&"lang_name"===R.sortField?R.sortBy:""})]}),(0,A.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:["Language Code",(0,A.jsx)(v.A,{name:"lang_code",icon:null!==R&&void 0!==R&&R.sortField&&"lang_code"===R.sortField&&"asc"!==R.sortBy?(0,A.jsx)(y.hIM,{color:C.palette.common.black,size:15}):(0,A.jsx)(y.wyk,{color:C.palette.common.black,size:15}),onSelect:M,options:b.I1,value:null!==R&&void 0!==R&&R.sortField&&"lang_code"===R.sortField?R.sortBy:""})]}),(0,A.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Action"})]})}),W.length>0?W.map(((e,t)=>(0,A.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:[(0,A.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:S*(k-1)+t+1}),(0,A.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:e.lang_name}),(0,A.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:e.lang_code}),(0,A.jsxs)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[null!==l&&void 0!==l&&l.can_read?(0,A.jsx)(r.A,{size:"small",onClick:()=>{return l=e._id,void a("/languages/view/".concat(l));var l},style:{color:C.palette.info.main},children:(0,A.jsx)(d.Ny1,{})}):"",null!==l&&void 0!==l&&l.can_update?(0,A.jsx)(r.A,{size:"small",onClick:()=>{return l=e._id,void a("/languages/edit/".concat(l));var l},style:{color:C.palette.warning.main},children:(0,A.jsx)(i.EaJ,{})}):"",null!==l&&void 0!==l&&l.can_delete?(0,A.jsx)(r.A,{size:"small",onClick:()=>{return l=e._id,N(l),void E(!0);var l},style:{color:C.palette.error.main},children:(0,A.jsx)(o.b6i,{})}):""]})]},t))):(0,A.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:C.palette.background.paper,borderRadius:"10px",boxShadow:C.shadows[1]},children:"No Language Found"}),(0,A.jsx)(c.A,{currentPage:k,totalItems:B,itemsPerPage:S,onPageChange:w,onItemsPerPageChange:P})]})}},7863:(e,l,a)=>{a.d(l,{A:()=>c});var t=a(6213),n=a(1944),r=a(790),o=a(8402);const i=t.A.create({baseURL:n.A.base_url,timeout:1e4,headers:{Accept:"application/json, application/octet-stream"},withCredentials:!1});let s=!1,d=[];i.interceptors.request.use((e=>{const l=localStorage.getItem(r.o.localStorageKeys.token);return l&&(e.headers.Authorization="Bearer ".concat(l),e.withCredentials=!0),e}),(e=>Promise.reject(e))),i.interceptors.response.use((e=>e),(e=>{const{config:l,response:a}=e,t=l;if("Token has expired"===a.data.message){if(!s){s=!0;const l=localStorage.getItem(r.o.localStorageKeys.refresh_token);return i.post(n.A.refresh_token_url,{refreshToken:l}).then((e=>{var l;let{data:a}=e;const n=null===a||void 0===a||null===(l=a.payload)||void 0===l?void 0:l.accessToken;var o;return localStorage.setItem(r.o.localStorageKeys.token,n),s=!1,o=n,d.forEach((e=>e(o))),d=[],t.headers.Authorization="Bearer ".concat(n),i(t)})).catch((l=>(console.error("Failed to refresh token:",l),(0,o.sw)(),window.location.href=n.A.login_path,Promise.reject(e))))}return new Promise((e=>{var l;l=l=>{t.headers.Authorization="Bearer ".concat(l),e(i(t))},d.push(l)}))}return"Token is invalid"===a.data.message&&((0,o.sw)(),window.location.href=n.A.login_path),Promise.reject(e)}));const c=i},91:(e,l,a)=>{a.d(l,{$w:()=>g,I1:()=>t,Lw:()=>s,Rr:()=>i,aB:()=>c,bx:()=>n,cK:()=>x,jH:()=>m,qR:()=>p,qi:()=>d,tG:()=>o,wX:()=>u,yl:()=>r});const t=[{label:"Sort A to Z",value:"asc"},{label:"Sort Z to A",value:"desc"}],n=[{label:"Active",value:!0},{label:"Inactive",value:!1}],r=[{label:"Unverified",value:!1},{label:"verified",value:!0}],o=[{label:"App User",value:!0},{label:"Admin",value:!1}],i=[{label:"Newest First",value:"desc"},{label:"Oldest First",value:"asc"}],s=[{label:"Highest First",value:"desc"},{label:"Lowest First",value:"asc"}],d=[{label:"Pending",value:"pending"},{label:"Confirm",value:"confirm"},{label:"Reject",value:"rejected"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"},{label:"Return Requested",value:"return_requested"},{label:"Return Accepeted",value:"return_accepeted"},{label:"Return Rejected",value:"return_rejected"},{label:"Return Fulfilled",value:"return_fulfilled"}],c=[{label:"Credit",value:"credit"},{label:"Debit",value:"debit"}],p=[{label:"Unpaid",value:"unpaid"},{label:"Paid",value:"paid"}],u=[{label:"Cash",value:"cash"},{label:"Online",value:"online"}],x=[{label:"GM",value:"GM"},{label:"ML",value:"ML"},{label:"KG",value:"KG"},{label:"LTR",value:"LTR"},{label:"EACH",value:"EACH"}],m=[{label:"Percentage",value:"percentage"},{label:"Fixed Amount",value:"fixed_amount"},{label:"Tiered",value:"tiered"},{label:"Buy X Get Y",value:"buy_x_get_y"},{label:"Bundle",value:"bundle"},{label:"Referral",value:"referral"},{label:"Coupon",value:"coupon"}],g=[{label:"Percentage",value:"percentage"},{label:"Amount",value:"amount"}]},4356:(e,l,a)=>{a.d(l,{f1:()=>o,uT:()=>r});var t=a(1036);a(2342);const n={position:"top-center",closeButton:!1,progress:!1},r=e=>{t.oR.success(e,n)},o=e=>{t.oR.error(e,n)}},4324:(e,l,a)=>{var t=a(4994);l.A=void 0;var n=t(a(39)),r=a(579);l.A=(0,n.default)((0,r.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"SearchTwoTone")}}]);
//# sourceMappingURL=3815.009be436.chunk.js.map