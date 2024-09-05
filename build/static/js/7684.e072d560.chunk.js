"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[7684],{3626:(e,t,o)=>{o.r(t),o.d(t,{default:()=>b});var n=o(5043),l=o(9252),a=o(5146),r=o(1906),i=o(7392),s=o(5865),d=o(184),u=o(6720),c=o(3216),m=o(6240),p=o(8716),v=o(1935),h=o(7863),f=o(1944),g=o(4356),y=o(3003),A=o(4861),x=o(579);const b=()=>{var e,t,o,b;const w=(0,m.A)(),I=(0,c.Zp)(),[k,O]=(0,n.useState)(!1),[C,j]=(0,n.useState)(!1),[_,M]=(0,n.useState)({}),[S,T]=(0,n.useState)({}),R=(0,y.wA)(),[N,E]=(0,n.useState)(!1),[P,L]=(0,n.useState)(180),[W,D]=(0,n.useState)(!1),V=(e,t)=>{const o=e.split(".");M((e=>{let n={...e},l=n;for(let t=0;t<o.length-1;t++)l[o[t]]=l[o[t]]||{},l=l[o[t]];return l[o[o.length-1]]=t,n})),T((e=>{let t={...e},n=t;for(let l=0;l<o.length-1;l++)n[o[l]]=n[o[l]]||{},n=n[o[l]];return delete n[o[o.length-1]],t}))};return(0,n.useEffect)((()=>{let e;return N&&P>0?e=setInterval((()=>{L((e=>e-1))}),1e3):0===P&&clearInterval(e),()=>clearInterval(e)}),[N,P]),(0,x.jsxs)(l.A,{maxWidth:"xs",style:{margin:"0rem",padding:"0px"},children:[N||W?"":(0,x.jsx)(a.A,{fullWidth:!0,className:"defaultText",label:"Email",margin:"normal",InputProps:{startAdornment:(0,x.jsx)("div",{style:{display:"inline-flex",color:w.palette.common.black,marginRight:"0.5rem"},children:(0,x.jsx)(d.maD,{})})},style:{input:{padding:"0.8rem 0px",color:w.palette.common.black},".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black},".MuiInputLabel-root":{color:w.palette.common.black},".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black}},onChange:e=>V("email",e.target.value)}),(null===S||void 0===S||null===(e=S.email)||void 0===e?void 0:e.message)&&(0,x.jsx)("div",{style:{textAlign:"left"},children:(0,x.jsx)(A.A,{message:S.email.message})}),N||W?"":(0,x.jsx)(r.A,{fullWidth:!0,variant:"contained",color:"primary",style:{backgroundColor:w.palette.primary,color:w.palette.common.white,marginTop:"0.5rem",":hover":{backgroundColor:w.palette.secondary}},onClick:async()=>{try{var e;const l={email:null===_||void 0===_?void 0:_.email};if(!await(0,p.i6)(p.ST,l,T))return;R((0,v.vL)());const a=await h.A.post(f.A.Auth.SEND_VERIFICATION_CODE,l);var t,o,n;if(null!==(e=a.data)&&void 0!==e&&e.payload)(0,g.uT)(null===(t=a.data)||void 0===t?void 0:t.message),null!==(o=a.data)&&void 0!==o&&null!==(n=o.payload)&&void 0!==n&&n.status&&E(!0);R((0,v.xv)())}catch(r){var l,a;console.log(r),(0,g.f1)(null===r||void 0===r||null===(l=r.response)||void 0===l||null===(a=l.data)||void 0===a?void 0:a.message),R((0,v.xv)())}},children:"Send Verification Code"}),N?(0,x.jsx)(a.A,{fullWidth:!0,className:"defaultText",label:"OTP",margin:"normal",InputProps:{startAdornment:(0,x.jsx)("div",{style:{display:"inline-flex",color:w.palette.common.black,marginRight:"0.5rem"},children:(0,x.jsx)(u.qkT,{})})},style:{input:{padding:"0.8rem 0px",color:w.palette.common.black},".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black},".MuiInputLabel-root":{color:w.palette.common.black},".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black}},onChange:e=>V("verification_code",e.target.value)}):"",(null===S||void 0===S||null===(t=S.verification_code)||void 0===t?void 0:t.message)&&(0,x.jsx)("div",{style:{textAlign:"left"},children:(0,x.jsx)(A.A,{message:S.verification_code.message})}),N?(0,x.jsx)(r.A,{fullWidth:!0,variant:"contained",color:"primary",style:{backgroundColor:w.palette.primary,color:w.palette.common.white,marginTop:"1rem",":hover":{backgroundColor:w.palette.secondary}},onClick:async()=>{try{var e;const l={email:null===_||void 0===_?void 0:_.email,verification_code:null===_||void 0===_?void 0:_.verification_code};if(!await(0,p.i6)(p.Ng,l,T))return;R((0,v.vL)());const a=await h.A.post(f.A.Auth.VERIFY_VERIFICATION_CODE,l);var t,o,n;if(null!==(e=a.data)&&void 0!==e&&e.payload)(0,g.uT)(null===(t=a.data)||void 0===t?void 0:t.message),null!==(o=a.data)&&void 0!==o&&null!==(n=o.payload)&&void 0!==n&&n.verified&&D(!0),E(!1);R((0,v.xv)())}catch(r){var l,a;console.log(r),(0,g.f1)(null===r||void 0===r||null===(l=r.response)||void 0===l||null===(a=l.data)||void 0===a?void 0:a.message),R((0,v.xv)())}},children:"Verify Otp"}):"",N?(0,x.jsx)("div",{style:{display:"flex",justifyContent:"end",alignItems:"center",marginTop:"1rem",gap:"0.5rem"},children:(0,x.jsxs)(r.A,{variant:"contained",onClick:async()=>{try{var e;const l={email:null===_||void 0===_?void 0:_.email};if(!await(0,p.i6)(p.ST,l,T))return;R((0,v.vL)());const a=await h.A.post(f.A.Auth.RESEND_VERIFICATION_CODE,l);var t,o,n;if(null!==(e=a.data)&&void 0!==e&&e.payload)(0,g.uT)(null===(t=a.data)||void 0===t?void 0:t.message),null!==(o=a.data)&&void 0!==o&&null!==(n=o.payload)&&void 0!==n&&n.status&&E(!0);R((0,v.xv)())}catch(r){var l,a;console.log(r),(0,g.f1)(null===r||void 0===r||null===(l=r.response)||void 0===l||null===(a=l.data)||void 0===a?void 0:a.message),R((0,v.xv)())}},disabled:N&&P>0,style:{backgroundColor:w.palette.secondary.main,color:w.palette.common.white,":hover":{backgroundColor:w.palette.secondary.main}},children:["Resend Code ",P>0?"(".concat(P,")"):""]})}):"",W?(0,x.jsx)(a.A,{fullWidth:!0,className:"defaultText",label:"New Password",type:k?"text":"password",margin:"normal",InputProps:{startAdornment:(0,x.jsx)("div",{style:{display:"inline-flex",color:w.palette.common.black,marginRight:"0.5rem"},children:(0,x.jsx)(d.JhU,{})}),endAdornment:(0,x.jsx)(i.A,{onClick:()=>{O(!k)},size:"small",children:k?(0,x.jsx)(d.mx3,{color:w.palette.common.black}):(0,x.jsx)(d.Ny1,{color:w.palette.common.black})})},style:{input:{padding:"0.8rem 0px",color:w.palette.common.black},".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black},".MuiInputLabel-root":{color:w.palette.common.black},".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black}},onChange:e=>V("new_password",e.target.value)}):"",(null===S||void 0===S||null===(o=S.new_password)||void 0===o?void 0:o.message)&&(0,x.jsx)("div",{style:{textAlign:"left"},children:(0,x.jsx)(A.A,{message:S.new_password.message})}),W?(0,x.jsx)(a.A,{fullWidth:!0,className:"defaultText",label:"Confirm New Password",type:C?"text":"password",margin:"normal",InputProps:{startAdornment:(0,x.jsx)("div",{style:{display:"inline-flex",color:w.palette.common.black,marginRight:"0.5rem"},children:(0,x.jsx)(d.JhU,{})}),endAdornment:(0,x.jsx)(i.A,{onClick:()=>{j(!C)},size:"small",children:C?(0,x.jsx)(d.mx3,{color:w.palette.common.black}):(0,x.jsx)(d.Ny1,{color:w.palette.common.black})})},style:{input:{padding:"0.8rem 0px",color:w.palette.common.black},".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black},".MuiInputLabel-root":{color:w.palette.common.black},".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:w.palette.common.black}},onChange:e=>V("confirm_password",e.target.value)}):"",(null===S||void 0===S||null===(b=S.confirm_password)||void 0===b?void 0:b.message)&&(0,x.jsx)("div",{style:{textAlign:"left"},children:(0,x.jsx)(A.A,{message:S.confirm_password.message})}),W?(0,x.jsx)(r.A,{fullWidth:!0,variant:"contained",color:"primary",style:{backgroundColor:w.palette.primary,color:w.palette.common.white,marginTop:"1rem",":hover":{backgroundColor:w.palette.secondary}},onClick:async()=>{try{var e;const l={email:null===_||void 0===_?void 0:_.email,new_password:null===_||void 0===_?void 0:_.new_password,confirm_password:null===_||void 0===_?void 0:_.confirm_password};if(!await(0,p.i6)(p.Oh,l,T))return;R((0,v.vL)());const a=await h.A.post(f.A.Auth.CHANGE_PASSWORD,l);var t,o,n;if(null!==(e=a.data)&&void 0!==e&&e.payload)(0,g.uT)(null===(t=a.data)||void 0===t?void 0:t.message),null!==(o=a.data)&&void 0!==o&&null!==(n=o.payload)&&void 0!==n&&n.status&&I("/authentication/login");R((0,v.xv)())}catch(r){var l,a;console.log(r),(0,g.f1)(null===r||void 0===r||null===(l=r.response)||void 0===l||null===(a=l.data)||void 0===a?void 0:a.message),R((0,v.xv)())}},children:"Reset Password"}):"",(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1rem",gap:"0.5rem"},children:[(0,x.jsx)(s.A,{align:"center",sx:{m:0},children:"Remembered Credentials?"}),(0,x.jsx)(r.A,{type:"text",onClick:()=>I("/authentication/login"),style:{fontSize:"0.875rem",color:w.palette.primary,padding:"0px",cursor:"pointer",justifyContent:"end",textDecoration:"none",backgroundColor:"transparent",":hover":{color:w.palette.secondary}},children:"Log in"})]})]})}},6060:(e,t,o)=>{o.d(t,{A:()=>y});var n=o(8168),l=o(8587),a=o(3391),r=o(9172),i=o(8280),s=o(8812);const d=["ownerState"],u=["variants"],c=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function m(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const p=(0,i.A)(),v=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function h(e){let{defaultTheme:t,theme:o,themeId:n}=e;return l=o,0===Object.keys(l).length?t:o[n]||o;var l}function f(e){return e?(t,o)=>o[e]:null}function g(e,t){let{ownerState:o}=t,a=(0,l.A)(t,d);const r="function"===typeof e?e((0,n.A)({ownerState:o},a)):e;if(Array.isArray(r))return r.flatMap((e=>g(e,(0,n.A)({ownerState:o},a))));if(r&&"object"===typeof r&&Array.isArray(r.variants)){const{variants:e=[]}=r;let t=(0,l.A)(r,u);return e.forEach((e=>{let l=!0;"function"===typeof e.props?l=e.props((0,n.A)({ownerState:o},a,o)):Object.keys(e.props).forEach((t=>{(null==o?void 0:o[t])!==e.props[t]&&a[t]!==e.props[t]&&(l=!1)})),l&&(Array.isArray(t)||(t=[t]),t.push("function"===typeof e.style?e.style((0,n.A)({ownerState:o},a,o)):e.style))})),t}return r}const y=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:o=p,rootShouldForwardProp:i=m,slotShouldForwardProp:d=m}=e,u=e=>(0,s.A)((0,n.A)({},e,{theme:h((0,n.A)({},e,{defaultTheme:o,themeId:t}))}));return u.__mui_systemSx=!0,function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,a.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:p,slot:y,skipVariantsResolver:A,skipSx:x,overridesResolver:b=f(v(y))}=s,w=(0,l.A)(s,c),I=void 0!==A?A:y&&"Root"!==y&&"root"!==y||!1,k=x||!1;let O=m;"Root"===y||"root"===y?O=i:y?O=d:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(O=void 0);const C=(0,a.default)(e,(0,n.A)({shouldForwardProp:O,label:undefined},w)),j=e=>"function"===typeof e&&e.__emotion_real!==e||(0,r.Q)(e)?l=>g(e,(0,n.A)({},l,{theme:h({theme:l.theme,defaultTheme:o,themeId:t})})):e,_=function(l){let a=j(l);for(var r=arguments.length,i=new Array(r>1?r-1:0),s=1;s<r;s++)i[s-1]=arguments[s];const d=i?i.map(j):[];p&&b&&d.push((e=>{const l=h((0,n.A)({},e,{defaultTheme:o,themeId:t}));if(!l.components||!l.components[p]||!l.components[p].styleOverrides)return null;const a=l.components[p].styleOverrides,r={};return Object.entries(a).forEach((t=>{let[o,a]=t;r[o]=g(a,(0,n.A)({},e,{theme:l}))})),b(e,r)})),p&&!I&&d.push((e=>{var l;const a=h((0,n.A)({},e,{defaultTheme:o,themeId:t}));return g({variants:null==a||null==(l=a.components)||null==(l=l[p])?void 0:l.variants},(0,n.A)({},e,{theme:a}))})),k||d.push(u);const c=d.length-i.length;if(Array.isArray(l)&&c>0){const e=new Array(c).fill("");a=[...l,...e],a.raw=[...l.raw,...e]}const m=C(a,...d);return e.muiName&&(m.muiName=e.muiName),m};return C.withConfig&&(_.withConfig=C.withConfig),_}}()},2900:(e,t,o)=>{o.d(t,{A:()=>a});var n=o(4775),l=o(5527);function a(e){let{props:t,name:o,defaultTheme:a,themeId:r}=e,i=(0,l.A)(a);r&&(i=i[r]||i);return(0,n.A)({theme:i,name:o,props:t})}}}]);
//# sourceMappingURL=7684.e072d560.chunk.js.map