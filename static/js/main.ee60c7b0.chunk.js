(this.webpackJsonpnametag=this.webpackJsonpnametag||[]).push([[0],{109:function(e,t){},110:function(e,t){},111:function(e,t){},122:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),r=n(40),s=n.n(r),i=n(19),o=n.n(i),l=n(27),u=n(139),j=n(14),d=n(67),b=(n(91),d.a.initializeApp({apiKey:"AIzaSyCUqHmiQD8PkE0UDMsuHjAhrZ9QQNrydeg",authDomain:"nametag-de54e.firebaseapp.com",projectId:"nametag-de54e",storageBucket:"nametag-de54e.appspot.com",messagingSenderId:"686023333837",appId:"1:686023333837:web:80907e123a1eb4f45e5684",measurementId:"G-YYT9G3V3TS"})),h=b.auth(),f=n(6),p=c.a.createContext();function O(){return Object(a.useContext)(p)}function x(e){var t=e.children,n=Object(a.useState)(),c=Object(j.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(!0),o=Object(j.a)(i,2),l=o[0],u=o[1];Object(a.useEffect)((function(){return h.onAuthStateChanged((function(e){s(e),u(!1)}))}),[]);var d={currentUser:r,changeUser:function(e){s(e)}};return Object(f.jsx)(p.Provider,{value:d,children:!l&&t})}var m=n(39),g=n(16),v=n(141),y=n(50),k=function(e){console.log(e)};function S(){var e=O().changeUser,t=Object(g.g)();function n(){return(n=Object(l.a)(o.a.mark((function n(a){var c;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e(a.profileObj);case 2:if(c=a.profileObj.email,-1!==c.indexOf("@college.harvard.edu")){n.next=11;break}return alert("Please sign in using your Harvard College email address!"),n.next=8,e(null);case 8:c=null,n.next=12;break;case 11:t.push("/");case 12:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(f.jsx)(v.a,{style:{backgroundColor:"#A51C30"},children:Object(f.jsxs)(v.a.Body,{children:[Object(f.jsx)("h2",{className:"text-center mb-4",style:{color:"white"},children:"Nametag"}),Object(f.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(f.jsx)(y.GoogleLogin,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Log in with Google",onSuccess:function(e){return n.apply(this,arguments)},onFailure:k,cookiePolicy:"single_host_origin",isSignedIn:!0,uxMode:"popup"})})]})})}var w=n(31),C=n(43),N=n(140),I=n(52),A=n.n(I),R=n(137),z=n(138),L=n(72),U=n.n(L),P=n(70),G=n.n(P),M=n(55),H=n.n(M),E=n(73),T=n.n(E),D=n(69),F=n.n(D),V=n(71),_=n.n(V),B=n(34),J=n(135),Q=Object(J.a)((function(e){return{button:{margin:e.spacing(1)}}}));var W=function(){var e="user",t={facingMode:e},n=c.a.useState(e),r=Object(j.a)(n,2),s=r[0],i=r[1],u=c.a.useCallback((function(){i((function(t){return t===e?"environment":e}))}),[]),d=Q(),b=Object(g.g)(),h=O().currentUser,p=Object(a.useRef)(null),x=Object(a.useRef)(),m=Object(a.useRef)(),v=Object(a.useRef)(),y=Object(a.useRef)(),k=Object(a.useState)(!1),S=Object(j.a)(k,2),I=S[0],L=S[1],P=Object(a.useState)("Hold the phone so that your face takes up the majority of the screen, but no parts of your head is cut off. Make sure you have good lighting and that you are not holding the phone at an angle. When you are ready, click the button above."),M=Object(j.a)(P,2),E=M[0],D=M[1],V=Object(a.useState)("Run facial recognition"),J=Object(j.a)(V,2),W=J[0],q=J[1],Y=Object(a.useState)(!1),K=Object(j.a)(Y,2),Z=K[0],X=K[1],$=Object(a.useState)(!0),ee=Object(j.a)($,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(null),ce=Object(j.a)(ae,2),re=ce[0],se=ce[1],ie=Object(a.useState)(null),oe=Object(j.a)(ie,2),le=oe[0],ue=oe[1],je=Object(a.useState)(null),de=Object(j.a)(je,2),be=de[0],he=de[1],fe=Object(a.useState)(null),pe=Object(j.a)(fe,2),Oe=pe[0],xe=pe[1],me=Object(a.useState)(null),ge=Object(j.a)(me,2),ve=ge[0],ye=ge[1];function ke(){b.push("/")}var Se=function(){""===x.current.value||null==re?alert("Please scan your face and fill in your name."):(C.a.database().ref("Users/"+h.googleId).set({descriptor:re,name:x.current.value,phone:m.current.value,insta:v.current.value,snap:y.current.value},(function(e){console.log(e)})),ke(),alert("Successfully saved data!"))},we=function(){L(!1),ne(!0)},Ce=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return se(null),e.next=3,Ne();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof p.current||null===p.current||4!==p.current.video.readyState){e.next=7;break}return t=p.current.video,D("Analyzing face..."),e.next=5,B.a(t).withFaceLandmarks().withFaceDescriptor();case 5:null!=(n=e.sent)?(se(n.descriptor),q("Run facial recognition"),X(!0),ne(!1),D("")):D("No face detected, please try again.");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){C.a.database().ref("Users/"+h.googleId).once("value",(function(e){e.exists()&&(se(e.val().descriptor),ue(e.val().name),he(e.val().phone),xe(e.val().insta),ye(e.val().snap))}))}),[]),Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)(R.a,{"aria-label":"home",onClick:function(){ke()},children:Object(f.jsx)(F.a,{})}),te?null:Object(f.jsx)(R.a,{"aria-label":"clear",onClick:function(){we()},children:Object(f.jsx)(G.a,{})}),I?Object(f.jsxs)("div",{children:[Object(f.jsx)(A.a,{ref:p,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(w.a)(Object(w.a)({},t),{},{facingMode:s}),mirrored:s===e}),Z?Object(f.jsx)("div",{children:Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:d.button,onClick:function(){return we()},children:"Finish"})}):Object(f.jsxs)("div",{children:[Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:d.button,onClick:function(){return ne(!0),q("Running facial recognition..."),void Ce()},children:W}),te?null:Object(f.jsx)(R.a,{onClick:u,children:Object(f.jsx)(H.a,{})})]}),Object(f.jsx)("p",{children:E})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{children:"The following inputs will be public to all Harvard College students when they scan your face. Please leave any field for which you do not want to be publicly available blank."}),Object(f.jsxs)(N.a,{children:[Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:d.button,startIcon:Object(f.jsx)(_.a,{}),onClick:function(){return ue(x.current.value),he(m.current.value),xe(v.current.value),ye(y.current.value),X(!1),ne(!1),void L(!0)},children:"Open Camera to scan face"}),re?Object(f.jsx)(U.a,{}):Object(f.jsx)(T.a,{}),Object(f.jsxs)("div",{children:[Object(f.jsxs)(N.a.Group,{id:"name",children:[Object(f.jsx)(N.a.Label,{children:"Name"}),Object(f.jsx)(N.a.Control,{ref:x,defaultValue:le,placeholder:"John Harvard",required:!0})]}),Object(f.jsxs)(N.a.Group,{id:"phone",children:[Object(f.jsx)(N.a.Label,{children:"Phone number"}),Object(f.jsx)(N.a.Control,{placeholder:"555-555-5555",defaultValue:be,ref:m})]}),Object(f.jsxs)(N.a.Group,{id:"insta",children:[Object(f.jsx)(N.a.Label,{children:"Instagram"}),Object(f.jsx)(N.a.Control,{placeholder:"username",defaultValue:Oe,ref:v})]}),Object(f.jsxs)(N.a.Group,{id:"snap",children:[Object(f.jsx)(N.a.Label,{children:"Snapchat"}),Object(f.jsx)(N.a.Control,{placeholder:"username",defaultValue:ve,ref:y})]})]}),Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:d.button,onClick:function(){Se()},children:"Save Profile"})]})]})]})})},q=n(77),Y=["component"];function K(e){var t=e.component,n=Object(q.a)(e,Y),a=O().currentUser;return Object(f.jsx)(g.b,Object(w.a)(Object(w.a)({},n),{},{render:function(e){return a?Object(f.jsx)(t,Object(w.a)({},e)):Object(f.jsx)(g.a,{to:"/login"})}}))}var Z=n(74),X=n.n(Z),$=n(75),ee=n.n($),te=Object(J.a)((function(e){return{button:{margin:e.spacing(1)}}}));var ne=function(){var e,t="user",n="environment",r={facingMode:t},s=c.a.useState(n),i=Object(j.a)(s,2),u=i[0],d=i[1],b=c.a.useCallback((function(){d((function(e){return e===t?n:t}))}),[]),h=Object(g.g)(),p=O(),x=p.changeUser,m=p.currentUser,v=te(),k=Object(a.useState)("Hold the phone so that the person's face takes up the majority of the screen, but no part of their head is cut off. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the button above."),S=Object(j.a)(k,2),N=S[0],I=S[1],L=Object(a.useState)(!1),U=Object(j.a)(L,2),P=U[0],G=U[1],M=Object(a.useState)("Run facial recognition"),E=Object(j.a)(M,2),T=E[0],D=E[1],F=Object(a.useState)(""),V=Object(j.a)(F,2),_=V[0],J=V[1],Q=Object(a.useState)(""),W=Object(j.a)(Q,2),q=W[0],Y=W[1],K=Object(a.useState)(""),Z=Object(j.a)(K,2),$=Z[0],ne=Z[1],ae=Object(a.useState)(""),ce=Object(j.a)(ae,2),re=ce[0],se=ce[1],ie=Object(a.useState)(!1),oe=Object(j.a)(ie,2),le=oe[0],ue=oe[1],je="sms:"+q,de="instagram://user?username="+re,be="snapchat://add/"+$,he=Object(a.useRef)(null);function fe(){return(fe=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(null);case 2:h.push("/login");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var pe=function(){var t=Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=null,t.next=3,Oe();case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Oe=function(){var t=Object(l.a)(o.a.mark((function t(){var n,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("undefined"===typeof he.current||null===he.current||4!==he.current.video.readyState){t.next=7;break}return n=he.current.video,I("Analyzing face..."),t.next=5,B.a(n).withFaceLandmarks().withFaceDescriptor();case 5:null!=(a=t.sent)?(e=a.descriptor,D("Run facial recognition"),I("The scanned face does not match any face in our database."),xe(),ue(!1)):I("No face detected, please try again.");case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),xe=function(){var t=1;C.a.database().ref("Users").on("child_added",(function(n){var a=n.val(),c=1;null!=a.descriptor&&(c=B.b(a.descriptor,e)),c<t&&c<.5&&(t=c,G(!0),J(a.name),Y(a.phone),ne(a.snap),se(a.insta),I(""))}))};return Object(a.useEffect)((function(){C.a.database().ref("Users/"+m.googleId).once("value",(function(e){e.exists()||(h.push("/profile"),alert("Please fill out your profile first!"))}))}),[]),Object(f.jsx)("div",{className:"App",style:{textAlign:"center"},children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)(y.GoogleLogout,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(){return fe.apply(this,arguments)}}),Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:v.button,startIcon:Object(f.jsx)(X.a,{}),onClick:function(){h.push("/profile")},children:"Edit Profile"}),Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:v.button,startIcon:Object(f.jsx)(ee.a,{}),onClick:function(){return window.open("https://venmo.com/code?user_id=3203314787287040028&created=1631377064","_blank")},children:"Donate"}),Object(f.jsxs)("div",{children:[Object(f.jsx)(A.a,{ref:he,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(w.a)(Object(w.a)({},r),{},{facingMode:u}),mirrored:u===t}),Object(f.jsx)(z.a,{variant:"contained",color:"primary",size:"small",className:v.button,onClick:function(){return D("Running facial recognition..."),ue(!0),J(""),Y(""),ne(""),se(""),G(!1),void pe()},children:T}),le?null:Object(f.jsx)(R.a,{onClick:b,children:Object(f.jsx)(H.a,{})})]}),Object(f.jsx)("hr",{}),Object(f.jsx)("p",{children:N}),P?Object(f.jsxs)("div",{style:{border:"2px solid black",backgroundColor:"lightgray",paddingTop:"10px"},children:[Object(f.jsx)("p",{children:"Name: "+_}),Object(f.jsxs)("p",{children:["Phone number: ",Object(f.jsx)("a",{href:je,children:q})]}),Object(f.jsxs)("p",{children:["Snapchat:  ",Object(f.jsx)("a",{href:be,children:$})]}),Object(f.jsxs)("p",{children:["Instagram: ",Object(f.jsx)("a",{href:de,children:re})]})]}):null,Object(f.jsx)("br",{})]})})},ae=n(76),ce=n.n(ae);var re=function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.e("/nametag/models");case 2:return e.next=4,B.c("/nametag/models");case 4:return e.next=6,B.d("/nametag/models");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){!function(){e.apply(this,arguments)}()})),Object(f.jsxs)(u.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:[Object(f.jsx)(ce.a,{}),Object(f.jsx)("div",{className:"w-100",style:{maxWidth:"400px"},children:Object(f.jsx)(m.a,{basename:"/nametag",children:Object(f.jsx)(x,{children:Object(f.jsxs)(g.d,{children:[Object(f.jsx)(K,{exact:!0,path:"/",component:ne}),Object(f.jsx)(K,{path:"/profile",component:W}),Object(f.jsx)(g.b,{path:"/login",component:S})]})})})})]})};n(120);s.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(re,{})}),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.ee60c7b0.chunk.js.map