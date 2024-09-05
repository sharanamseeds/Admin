"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[7756],{48:(e,l,t)=>{t.d(l,{A:()=>D});var a=t(6240),i=t(7392),n=t(8577),o=t(8587),r=t(8168),d=t(5043),s=t(8387),c=t(8610),u=t(7266),p=t(6803),v=t(3064),x=t(4535),y=t(8206),m=t(2532),f=t(2372);function h(e){return(0,f.Ay)("MuiSwitch",e)}const g=(0,m.A)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var b=t(579);const j=["className","color","edge","size","sx"],A=(0,x.Ay)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,l)=>{const{ownerState:t}=e;return[l.root,t.edge&&l["edge".concat((0,p.A)(t.edge))],l["size".concat((0,p.A)(t.size))]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,["& .".concat(g.thumb)]:{width:16,height:16},["& .".concat(g.switchBase)]:{padding:4,["&.".concat(g.checked)]:{transform:"translateX(16px)"}}}}]}),_=(0,x.Ay)(v.A,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,l)=>{const{ownerState:t}=e;return[l.switchBase,{["& .".concat(g.input)]:l.input},"default"!==t.color&&l["color".concat((0,p.A)(t.color))]]}})((e=>{let{theme:l}=e;return{position:"absolute",top:0,left:0,zIndex:1,color:l.vars?l.vars.palette.Switch.defaultColor:"".concat("light"===l.palette.mode?l.palette.common.white:l.palette.grey[300]),transition:l.transitions.create(["left","transform"],{duration:l.transitions.duration.shortest}),["&.".concat(g.checked)]:{transform:"translateX(20px)"},["&.".concat(g.disabled)]:{color:l.vars?l.vars.palette.Switch.defaultDisabledColor:"".concat("light"===l.palette.mode?l.palette.grey[100]:l.palette.grey[600])},["&.".concat(g.checked," + .").concat(g.track)]:{opacity:.5},["&.".concat(g.disabled," + .").concat(g.track)]:{opacity:l.vars?l.vars.opacity.switchTrackDisabled:"".concat("light"===l.palette.mode?.12:.2)},["& .".concat(g.input)]:{left:"-100%",width:"300%"}}}),(e=>{let{theme:l}=e;return{"&:hover":{backgroundColor:l.vars?"rgba(".concat(l.vars.palette.action.activeChannel," / ").concat(l.vars.palette.action.hoverOpacity,")"):(0,u.X4)(l.palette.action.active,l.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(l.palette).filter((e=>{let[,l]=e;return l.main&&l.light})).map((e=>{let[t]=e;return{props:{color:t},style:{["&.".concat(g.checked)]:{color:(l.vars||l).palette[t].main,"&:hover":{backgroundColor:l.vars?"rgba(".concat(l.vars.palette[t].mainChannel," / ").concat(l.vars.palette.action.hoverOpacity,")"):(0,u.X4)(l.palette[t].main,l.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(g.disabled)]:{color:l.vars?l.vars.palette.Switch["".concat(t,"DisabledColor")]:"".concat("light"===l.palette.mode?(0,u.a)(l.palette[t].main,.62):(0,u.e$)(l.palette[t].main,.55))}},["&.".concat(g.checked," + .").concat(g.track)]:{backgroundColor:(l.vars||l).palette[t].main}}}}))]}})),w=(0,x.Ay)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,l)=>l.track})((e=>{let{theme:l}=e;return{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:l.transitions.create(["opacity","background-color"],{duration:l.transitions.duration.shortest}),backgroundColor:l.vars?l.vars.palette.common.onBackground:"".concat("light"===l.palette.mode?l.palette.common.black:l.palette.common.white),opacity:l.vars?l.vars.opacity.switchTrack:"".concat("light"===l.palette.mode?.38:.3)}})),C=(0,x.Ay)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,l)=>l.thumb})((e=>{let{theme:l}=e;return{boxShadow:(l.vars||l).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}})),k=d.forwardRef((function(e,l){const t=(0,y.b)({props:e,name:"MuiSwitch"}),{className:a,color:i="primary",edge:n=!1,size:d="medium",sx:u}=t,v=(0,o.A)(t,j),x=(0,r.A)({},t,{color:i,edge:n,size:d}),m=(e=>{const{classes:l,edge:t,size:a,color:i,checked:n,disabled:o}=e,d={root:["root",t&&"edge".concat((0,p.A)(t)),"size".concat((0,p.A)(a))],switchBase:["switchBase","color".concat((0,p.A)(i)),n&&"checked",o&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},s=(0,c.A)(d,h,l);return(0,r.A)({},l,s)})(x),f=(0,b.jsx)(C,{className:m.thumb,ownerState:x});return(0,b.jsxs)(A,{className:(0,s.A)(m.root,a),sx:u,ownerState:x,children:[(0,b.jsx)(_,(0,r.A)({type:"checkbox",icon:f,checkedIcon:f,ref:l,ownerState:x},v,{classes:(0,r.A)({},m,{root:m.switchBase})})),(0,b.jsx)(w,{className:m.track,ownerState:x})]})}));var S=t(7196),I=t(5394),R=t(423),T=t(4861);const D=function(e){let{startEdit:l=!1,sepratedUpdate:t=!1,prefix:o=[],suffix:r,name:s,error:c=null,isDisabel:u=!1,handleChange:p=(e,l)=>console.log(e,l),defaultValue:v=!1}=e;const[x,y]=(0,d.useState)(l),[m,f]=(0,d.useState)(!1),h=(0,a.A)();return(0,d.useEffect)((()=>{f(v)}),[v]),(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,b.jsxs)("div",{style:{display:"flex",gap:"0.5rem"},children:[(0,b.jsx)("div",{style:{padding:"0.5rem 0px",color:h.palette.common.black,borderRadius:"5px",border:"none"},children:(g=s,g.split("_").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" "))}),x?null:(0,b.jsx)("div",{style:{display:"inline-flex",marginRight:"0.3rem",color:h.palette.common.black},children:(0,b.jsx)(i.A,{style:{backgroundColor:"transparent"},size:"small",onClick:()=>y(!0),children:(0,b.jsx)(S.fkO,{color:h.palette.common.black})})}),x&&t?(0,b.jsx)("div",{style:{display:"inline-flex",marginRight:"0.3rem",color:h.palette.common.black},children:(0,b.jsx)(i.A,{size:"small",onClick:()=>{f(!1),t||p(s,""),y(!1)},children:(0,b.jsx)(I.Xr4,{color:h.palette.common.black})})}):null,x&&t?(0,b.jsx)("div",{style:{display:"inline-flex",marginRight:"0.3rem",color:h.palette.common.black},children:(0,b.jsx)(i.A,{size:"small",onClick:()=>{p(s,m),y(!1)},style:{backgroundColor:"transparent"},children:(0,b.jsx)(R.N__,{color:h.palette.common.black})})}):null]}),(0,b.jsx)(n.A,{style:{margin:"0px"},control:(0,b.jsx)(k,{checked:m,disabled:u,onChange:e=>{f(e.target.checked),t||p(s,e.target.checked)},style:{color:m?h.palette.secondary:void 0}})})]}),c?(0,b.jsx)("div",{style:{textAlign:"center"},children:(0,b.jsx)(T.A,{message:c})}):null]});var g}},7066:(e,l,t)=>{t.r(l),t.d(l,{default:()=>C});var a=t(3216),i=t(5043),n=t(8903),o=t(2110),r=t(6494),d=t(5865),s=t(6446),c=t(1906),u=t(3903),p=t(3003),v=t(1935),x=t(7863),y=t(1944),m=t(4356),f=t(8402),h=t(9618),g=t(6240),b=t(2526),j=t(48),A=t(91),_=t(214),w=t(579);const C=function(){var e,l,t,C,k,S,I,R;const{id:T}=(0,a.g)(),D=(0,g.A)(),[z,B]=(0,i.useState)({}),N=(0,p.wA)(),[E,L]=(0,i.useState)([]),[O,P]=(0,i.useState)(""),[q,M]=(0,i.useState)([]),[W,X]=(0,i.useState)([]);return(0,i.useEffect)((()=>{(async()=>{try{var e;N((0,v.vL)());const d=await x.A.get(y.A.Languages.GET_LIST);var l,t,a,i,n,o,r;null!==(e=d.data)&&void 0!==e&&e.payload&&(M(null===(l=d.data)||void 0===l||null===(t=l.payload)||void 0===t||null===(a=t.result)||void 0===a?void 0:a.data),P(null===(i=d.data)||void 0===i||null===(n=i.payload)||void 0===n||null===(o=n.result)||void 0===o||null===(r=o.data[0])||void 0===r?void 0:r.lang_code)),N((0,v.xv)())}catch(c){var d,s;console.log(c),(0,m.f1)(null===c||void 0===c||null===(d=c.response)||void 0===d||null===(s=d.data)||void 0===s?void 0:s.message),N((0,v.xv)())}})()}),[]),(0,i.useEffect)((()=>{(async()=>{try{var e;N((0,v.vL)());const i=await x.A.get(y.A.Products.GET_LIST,{params:{lang_code:O||"en"}});var l,t,a;null!==(e=i.data)&&void 0!==e&&e.payload&&L(null===(l=i.data)||void 0===l||null===(t=l.payload)||void 0===t||null===(a=t.result)||void 0===a?void 0:a.data),N((0,v.xv)())}catch(o){var i,n;console.log(o),(0,m.f1)(null===o||void 0===o||null===(i=o.response)||void 0===i||null===(n=i.data)||void 0===n?void 0:n.message),N((0,v.xv)())}})(),(async()=>{try{var e;N((0,v.vL)());const i=await x.A.get(y.A.Categories.GET_LIST,{params:{lang_code:O||"en"}});var l,t,a;null!==(e=i.data)&&void 0!==e&&e.payload&&X(null===(l=i.data)||void 0===l||null===(t=l.payload)||void 0===t||null===(a=t.result)||void 0===a?void 0:a.data),N((0,v.xv)())}catch(o){var i,n;console.log(o),(0,m.f1)(null===o||void 0===o||null===(i=o.response)||void 0===i||null===(n=i.data)||void 0===n?void 0:n.message),N((0,v.xv)())}})(),(async()=>{try{var e;N((0,v.vL)());const a=await x.A.get(y.A.Offers.GET_BY_ID+T,{params:{lang_code:O||"en"}});var l,t;null!==(e=a.data)&&void 0!==e&&e.payload&&B(null===(l=a.data)||void 0===l||null===(t=l.payload)||void 0===t?void 0:t.result),N((0,v.xv)())}catch(n){var a,i;console.log(n),(0,m.f1)(null===n||void 0===n||null===(a=n.response)||void 0===a||null===(i=a.data)||void 0===i?void 0:i.message),N((0,v.xv)())}})()}),[T,O]),(0,w.jsxs)(n.Ay,{container:!0,spacing:2,alignItems:"stretch",justifyContent:"end",children:[(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,children:(0,w.jsx)(o.A,{style:{height:"100%",display:"flex",flexDirection:"column"},children:(0,w.jsxs)(r.A,{style:{flex:1},children:[(0,w.jsx)(d.A,{variant:"h4",style:{fontWeight:"bold",marginBottom:"0.75rem"},children:"Offer Details"}),(0,w.jsxs)(n.Ay,{container:!0,spacing:2,children:[(0,w.jsx)(n.Ay,{item:!0,xs:12,sm:12,display:"flex",flexDirection:"column",alignItems:"center",children:(0,w.jsx)(b.A,{src:null!==z&&void 0!==z&&z.image?y.A.base_url+z.image:"",alt:"User Profile",height:"102px",width:"102px"})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"offer_type",value:null!==z&&void 0!==z&&z.offer_type?A.jH.find((e=>e.value===(null===z||void 0===z?void 0:z.offer_type))).label:""})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"offer_name",value:null===z||void 0===z?void 0:z.offer_name})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"offer_code",value:null===z||void 0===z?void 0:z.offer_code})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,children:(0,w.jsx)(h.A,{name:"language",startEdit:!0,seperatedLabel:!1,defaultValue:O,options:(0,f.Pc)(q,"lang_name","lang_code"),handleChange:(e,l)=>P(l)})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(j.A,{name:"is_active",startEdit:!0,defaultValue:null===z||void 0===z?void 0:z.is_active,isDisabel:!0})})]})]})})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,children:(0,w.jsx)(o.A,{style:{height:"100%",display:"flex",flexDirection:"column"},children:(0,w.jsxs)(r.A,{style:{flex:1},children:[(0,w.jsx)(d.A,{variant:"h4",style:{fontWeight:"bold",marginBottom:"0.75rem"},children:"Other Details"}),(0,w.jsxs)(n.Ay,{container:!0,spacing:2,children:[(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(j.A,{name:"product_specified",startEdit:!0,defaultValue:null===z||void 0===z?void 0:z.product_specified,isDisabel:!0})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(j.A,{name:"category_specified",startEdit:!0,defaultValue:null===z||void 0===z?void 0:z.category_specified,isDisabel:!0})}),null!==z&&void 0!==z&&z.offer_type&&"percentage"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"percentage_discount",value:null===z||void 0===z?void 0:z.percentage_discount})}):"",null!==z&&void 0!==z&&z.offer_type&&"fixed_amount"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"fixed_amount_discount",value:null===z||void 0===z?void 0:z.fixed_amount_discount})}):"",null!==z&&void 0!==z&&z.offer_type&&"buy_x_get_y"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"buy_quantity",value:null===z||void 0===z?void 0:z.buy_quantity})}):"",null!==z&&void 0!==z&&z.offer_type&&"buy_x_get_y"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"get_quantity",value:null===z||void 0===z?void 0:z.get_quantity})}):"",null!==z&&void 0!==z&&z.offer_type&&"referral"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"referral_code",value:null===z||void 0===z?void 0:z.referral_code})}):"",null!==z&&void 0!==z&&z.offer_type&&"referral"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"referral_amount",value:null===z||void 0===z?void 0:z.referral_amount})}):"",null!==z&&void 0!==z&&z.offer_type&&"coupon"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,children:(0,w.jsx)(u.A,{label:"coupon_code",value:null===z||void 0===z?void 0:z.coupon_code})}):"",null!==z&&void 0!==z&&z.offer_type&&"coupon"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"coupon_type",value:null!==z&&void 0!==z&&null!==(e=z.coupon_details)&&void 0!==e&&e.coupon_type?A.$w.find((e=>{var l;return e.value===(null===z||void 0===z||null===(l=z.coupon_details)||void 0===l?void 0:l.coupon_type)})).label:""})}):"",null!==z&&void 0!==z&&z.offer_type&&"coupon"===z.offer_type?(0,w.jsx)(n.Ay,{item:!0,xs:12,md:6,lg:6,sm:12,children:(0,w.jsx)(u.A,{label:"value",value:null===z||void 0===z||null===(l=z.coupon_details)||void 0===l?void 0:l.value})}):""]})]})})}),null!==z&&void 0!==z&&z.offer_type&&"tiered"===z.offer_type?(0,w.jsxs)(n.Ay,{item:!0,xs:12,children:[(0,w.jsx)("div",{style:{width:"100%"},children:(0,w.jsxs)("div",{style:{fontWeight:"bold",color:D.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Min Order Value"}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Discount"})]})}),(null===z||void 0===z||null===(t=z.tiers)||void 0===t?void 0:t.length)>0?null===z||void 0===z?void 0:z.tiers.map(((e,l)=>(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:l+1}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.min_order_value}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.discount})]},l))):(0,w.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:"No Tiers Added"})]}):"",null!==z&&void 0!==z&&z.offer_type&&"bundle"===z.offer_type?(0,w.jsxs)(n.Ay,{item:!0,xs:12,children:[(0,w.jsx)("div",{style:{width:"100%"},children:(0,w.jsxs)("div",{style:{fontWeight:"bold",color:D.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Product"}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Quantity"}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Price"})]})}),(null===z||void 0===z||null===(C=z.bundle_items)||void 0===C?void 0:C.length)>0?null===z||void 0===z?void 0:z.bundle_items.map(((e,l)=>{var t;return(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:l+1}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:null===(t=E.find((l=>l._id===e.product_id)))||void 0===t?void 0:t.product_name}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.quantity}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:e.price})]},l)})):(0,w.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:"No Bundels Added"})]}):"",(null===z||void 0===z||null===(k=z.products)||void 0===k?void 0:k.length)>0?(0,w.jsx)(n.Ay,{item:!0,xs:12,children:(0,w.jsx)(d.A,{variant:"h4",style:{fontWeight:"bold"},children:"Selected Products"})}):"",(null===z||void 0===z||null===(S=z.products)||void 0===S?void 0:S.length)>0?(0,w.jsxs)(n.Ay,{item:!0,xs:12,children:[(0,w.jsx)("div",{style:{width:"100%"},children:(0,w.jsxs)("div",{style:{fontWeight:"bold",color:D.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Product Name"}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Code"})]})}),null===z||void 0===z?void 0:z.products.map(((e,l)=>{var t,a;return(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:l+1}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:null===(t=E.find((l=>l._id===e)))||void 0===t?void 0:t.product_name}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:null===(a=E.find((l=>l._id===e)))||void 0===a?void 0:a.product_code})]},l)}))]}):"",(null===z||void 0===z||null===(I=z.categories)||void 0===I?void 0:I.length)>0?(0,w.jsx)(n.Ay,{item:!0,xs:12,children:(0,w.jsx)(d.A,{variant:"h4",style:{fontWeight:"bold"},children:"Selected Categories"})}):"",(null===z||void 0===z||null===(R=z.categories)||void 0===R?void 0:R.length)>0?(0,w.jsxs)(n.Ay,{item:!0,xs:12,children:[(0,w.jsx)("div",{style:{width:"100%"},children:(0,w.jsxs)("div",{style:{fontWeight:"bold",color:D.palette.text.primary,display:"flex",justifyContent:"space-between",padding:"15px",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Sr. No."}),(0,w.jsx)("div",{style:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},children:"Category Name"})]})}),null===z||void 0===z?void 0:z.categories.map(((e,l)=>{var t;return(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px",marginTop:"1rem",backgroundColor:D.palette.background.paper,borderRadius:"10px",boxShadow:D.shadows[1]},children:[(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:l+1}),(0,w.jsx)("div",{style:{flex:1,display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:null===(t=W.find((l=>l._id===e)))||void 0===t?void 0:t.category_name})]},l)}))]}):"",(0,w.jsx)(n.Ay,{item:!0,xs:12,md:12,lg:12,sm:12,children:(0,w.jsx)(o.A,{style:{height:"100%",display:"flex",flexDirection:"column"},children:(0,w.jsxs)(r.A,{style:{flex:1},children:[(0,w.jsx)(d.A,{variant:"h4",style:{fontWeight:"bold",marginBottom:"0.75rem"},children:"Description"}),(0,w.jsx)(_.A,{description:null===z||void 0===z?void 0:z.description})]})})}),(0,w.jsx)(n.Ay,{item:!0,xs:12,children:(0,w.jsx)(s.A,{sx:{display:"flex",justifyContent:"flex-end"},children:(0,w.jsx)(c.A,{variant:"contained",sx:{color:D.palette.common.white,width:"max-content",backgroundColor:D.palette.warning.main,"&:hover":{backgroundColor:D.palette.warning.main}},onClick:()=>window.history.back(),children:"Back"})})})]})}},91:(e,l,t)=>{t.d(l,{$w:()=>v,I1:()=>a,Lw:()=>r,Rr:()=>o,aB:()=>s,bx:()=>i,jH:()=>p,qR:()=>c,qi:()=>d,wX:()=>u,yl:()=>n});const a=[{label:"Sort A to Z",value:"asc"},{label:"Sort Z to A",value:"desc"}],i=[{label:"Active",value:!0},{label:"Inactive",value:!1}],n=[{label:"Unverified",value:!1},{label:"verified",value:!0}],o=[{label:"Newest First",value:"desc"},{label:"Oldest First",value:"asc"}],r=[{label:"Highest First",value:"desc"},{label:"Lowest First",value:"asc"}],d=[{label:"Pending",value:"pending"},{label:"Confirm",value:"confirm"},{label:"Reject",value:"rejected"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"},{label:"Return Requested",value:"return_requested"},{label:"Return Accepeted",value:"return_accepeted"},{label:"Return Rejected",value:"return_rejected"},{label:"Return Fulfilled",value:"return_fulfilled"}],s=[{label:"Credit",value:"credit"},{label:"Debit",value:"debit"}],c=[{label:"Unpaid",value:"unpaid"},{label:"Paid",value:"paid"}],u=[{label:"Cash",value:"cash"},{label:"Online",value:"online"}],p=[{label:"Percentage",value:"percentage"},{label:"Fixed Amount",value:"fixed_amount"},{label:"Tiered",value:"tiered"},{label:"Buy X Get Y",value:"buy_x_get_y"},{label:"Bundle",value:"bundle"},{label:"Referral",value:"referral"},{label:"Coupon",value:"coupon"}],v=[{label:"Percentage",value:"percentage"},{label:"Amount",value:"amount"}]}}]);
//# sourceMappingURL=7756.33d6b884.chunk.js.map