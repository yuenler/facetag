(this.webpackJsonpnametag=this.webpackJsonpnametag||[]).push([[0],{130:function(e,t){},131:function(e,t){},132:function(e,t){},137:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(25),o=n.n(r),i=n(23),s=n.n(i),l=n(34),u=n(16),d=n(160),j=n(81),b=(n(112),j.a.initializeApp({apiKey:"AIzaSyCUqHmiQD8PkE0UDMsuHjAhrZ9QQNrydeg",authDomain:"nametag-de54e.firebaseapp.com",projectId:"nametag-de54e",storageBucket:"nametag-de54e.appspot.com",messagingSenderId:"686023333837",appId:"1:686023333837:web:80907e123a1eb4f45e5684",measurementId:"G-YYT9G3V3TS"})),f=b.auth(),h=n(6),p=c.a.createContext();function O(){return Object(a.useContext)(p)}function g(e){var t=e.children,n=Object(a.useState)(),c=Object(u.a)(n,2),r=c[0],o=c[1],i=Object(a.useState)(!0),s=Object(u.a)(i,2),l=s[0],d=s[1];Object(a.useEffect)((function(){return f.onAuthStateChanged((function(e){o(e),d(!1)}))}),[]);var j={currentUser:r,changeUser:function(e){o(e)}};return Object(h.jsx)(p.Provider,{value:j,children:!l&&t})}var x=n(50),v=n(20),m=n(162),y=n(63),w=function(e){console.log(e)};function k(){var e=O().changeUser,t=Object(v.g)();function n(){return(n=Object(l.a)(s.a.mark((function n(a){var c;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e(a.profileObj);case 2:if(c=a.profileObj.email,-1!==c.indexOf("@college.harvard.edu")){n.next=11;break}return alert("Please sign in using your Harvard College email address!"),n.next=8,e(null);case 8:c=null,n.next=12;break;case 11:t.push("/");case 12:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(h.jsx)(m.a,{style:{backgroundColor:"#A51C30"},children:Object(h.jsxs)(m.a.Body,{children:[Object(h.jsx)("h2",{className:"text-center mb-4",style:{color:"white"},children:"Nametag"}),Object(h.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(h.jsx)(y.GoogleLogin,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Log in with Google",onSuccess:function(e){return n.apply(this,arguments)},onFailure:w,cookiePolicy:"single_host_origin",isSignedIn:!0,uxMode:"popup"})})]})})}var S=n(38),C=n(54),N=n(161),I=n(64),L=n.n(I),A=n(156),U=n(159),P=n(90),R=n.n(P),z=n(88),T=n.n(z),W=n(69),F=n.n(W),G=n(91),E=n.n(G),H=n(87),M=n.n(H),D=n(89),B=n.n(D),V=n(41),_=n(155),J=Object(_.a)((function(e){return{button:{margin:e.spacing(1)}}}));var Q=function(){var e="user",t={facingMode:e},n=c.a.useState(e),r=Object(u.a)(n,2),o=r[0],i=r[1],d=c.a.useCallback((function(){i((function(t){return t===e?"environment":e}))}),[]),j=J(),b=Object(v.g)(),f=O().currentUser,p=Object(a.useRef)(null),g=Object(a.useRef)(),x=Object(a.useRef)(),m=Object(a.useRef)(),y=Object(a.useRef)(),w=Object(a.useState)(!1),k=Object(u.a)(w,2),I=k[0],P=k[1],z=Object(a.useState)("Hold the phone so that your face takes up the majority of the screen, but no parts of your head is cut off. Make sure you have good lighting and that you are not holding the phone at an angle. When you are ready, click the button above."),W=Object(u.a)(z,2),G=W[0],H=W[1],D=Object(a.useState)("Run facial recognition"),_=Object(u.a)(D,2),Q=_[0],q=_[1],Y=Object(a.useState)(!1),K=Object(u.a)(Y,2),Z=K[0],$=K[1],X=Object(a.useState)(!0),ee=Object(u.a)(X,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(null),ce=Object(u.a)(ae,2),re=ce[0],oe=ce[1],ie=Object(a.useState)(null),se=Object(u.a)(ie,2),le=se[0],ue=se[1],de=Object(a.useState)(null),je=Object(u.a)(de,2),be=je[0],fe=je[1],he=Object(a.useState)(null),pe=Object(u.a)(he,2),Oe=pe[0],ge=pe[1],xe=Object(a.useState)(null),ve=Object(u.a)(xe,2),me=ve[0],ye=ve[1];function we(){b.push("/")}var ke=function(){""===g.current.value||null==re?alert("Please scan your face and fill in your name."):(C.a.database().ref("Users/"+f.googleId).set({descriptor:re,name:g.current.value,phone:x.current.value,insta:m.current.value,snap:y.current.value},(function(e){console.log(e)})),we(),alert("Successfully saved data!"))},Se=function(){P(!1),ne(!0)},Ce=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return oe(null),e.next=3,Ne();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){var e=Object(l.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof p.current||null===p.current||4!==p.current.video.readyState){e.next=9;break}return t=p.current.video,H("Analyzing face..."),e.next=5,V.a(t).withFaceLandmarks().withFaceDescriptor();case 5:null!=(n=e.sent)?(oe(n.descriptor),H(""),$(!0)):H("No face detected, please try again."),q("Run facial recognition"),ne(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){C.a.database().ref("Users/"+f.googleId).once("value",(function(e){e.exists()&&(oe(e.val().descriptor),ue(e.val().name),fe(e.val().phone),ge(e.val().insta),ye(e.val().snap))}))}),[]),Object(h.jsx)("div",{className:"App",children:Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)(A.a,{"aria-label":"home",onClick:function(){we()},children:Object(h.jsx)(M.a,{})}),te?null:Object(h.jsx)(A.a,{"aria-label":"clear",onClick:function(){Se()},children:Object(h.jsx)(T.a,{})}),I?Object(h.jsxs)("div",{children:[Object(h.jsx)(L.a,{ref:p,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(S.a)(Object(S.a)({},t),{},{facingMode:o}),mirrored:o===e}),Z?Object(h.jsx)("div",{children:Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:j.button,onClick:function(){return Se()},children:"Finish"})}):Object(h.jsxs)("div",{children:[Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:j.button,onClick:function(){return ne(!0),q("Running facial recognition..."),void Ce()},children:Q}),te?null:Object(h.jsx)(A.a,{onClick:d,children:Object(h.jsx)(F.a,{})})]}),Object(h.jsx)("p",{children:G})]}):Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"The following inputs will be public to all Harvard College students when they scan your face. Please leave any field for which you do not want to be publicly available blank."}),Object(h.jsxs)(N.a,{children:[Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:j.button,startIcon:Object(h.jsx)(B.a,{}),onClick:function(){return ue(g.current.value),fe(x.current.value),ge(m.current.value),ye(y.current.value),$(!1),ne(!1),void P(!0)},children:"Open Camera to scan face"}),re?Object(h.jsx)(R.a,{}):Object(h.jsx)(E.a,{}),Object(h.jsxs)("div",{children:[Object(h.jsxs)(N.a.Group,{id:"name",children:[Object(h.jsx)(N.a.Label,{children:"Name"}),Object(h.jsx)(N.a.Control,{ref:g,defaultValue:le,placeholder:"John Harvard",required:!0})]}),Object(h.jsxs)(N.a.Group,{id:"phone",children:[Object(h.jsx)(N.a.Label,{children:"Phone number"}),Object(h.jsx)(N.a.Control,{placeholder:"555-555-5555",defaultValue:be,ref:x})]}),Object(h.jsxs)(N.a.Group,{id:"insta",children:[Object(h.jsx)(N.a.Label,{children:"Instagram"}),Object(h.jsx)(N.a.Control,{placeholder:"username",defaultValue:Oe,ref:m})]}),Object(h.jsxs)(N.a.Group,{id:"snap",children:[Object(h.jsx)(N.a.Label,{children:"Snapchat"}),Object(h.jsx)(N.a.Control,{placeholder:"username",defaultValue:me,ref:y})]})]}),Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:j.button,onClick:function(){ke()},children:"Save Profile"})]})]})]})})},q=n(94),Y=["component"];function K(e){var t=e.component,n=Object(q.a)(e,Y),a=O().currentUser;return Object(h.jsx)(v.b,Object(S.a)(Object(S.a)({},n),{},{render:function(e){return a?Object(h.jsx)(t,Object(S.a)({},e)):Object(h.jsx)(v.a,{to:"/login"})}}))}var Z=n(92),$=n.n(Z),X=n(93),ee=n.n(X),te=Object(_.a)((function(e){return{button:{margin:e.spacing(1)}}}));var ne=function(){var e,t="user",n="environment",r={facingMode:t},o=c.a.useState(n),i=Object(u.a)(o,2),d=i[0],j=i[1],b=c.a.useCallback((function(){j((function(e){return e===t?n:t}))}),[]),f=Object(v.g)(),p=O(),g=p.changeUser,x=p.currentUser,m=te(),w=Object(a.useState)("Hold the phone so that the person's face takes up the majority of the screen, but no part of their head is cut off. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the button above."),k=Object(u.a)(w,2),N=k[0],I=k[1],P=Object(a.useState)(!1),R=Object(u.a)(P,2),z=R[0],T=R[1],W=Object(a.useState)("Run facial recognition"),G=Object(u.a)(W,2),E=G[0],H=G[1],M=Object(a.useState)(""),D=Object(u.a)(M,2),B=D[0],_=D[1],J=Object(a.useState)(""),Q=Object(u.a)(J,2),q=Q[0],Y=Q[1],K=Object(a.useState)(""),Z=Object(u.a)(K,2),X=Z[0],ne=Z[1],ae=Object(a.useState)(""),ce=Object(u.a)(ae,2),re=ce[0],oe=ce[1],ie=Object(a.useState)(!1),se=Object(u.a)(ie,2),le=se[0],ue=se[1],de="sms:"+q,je="instagram://user?username="+re,be="snapchat://add/"+X,fe=Object(a.useRef)(null);function he(){return(he=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(null);case 2:f.push("/login");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var pe=function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=null,t.next=3,Oe();case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Oe=function(){var t=Object(l.a)(s.a.mark((function t(){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("undefined"===typeof fe.current||null===fe.current||4!==fe.current.video.readyState){t.next=9;break}return n=fe.current.video,I("Analyzing face..."),t.next=5,V.a(n).withFaceLandmarks().withFaceDescriptor();case 5:null!=(a=t.sent)?(e=a.descriptor,I("The scanned face does not match any face in our database."),ge()):I("No face detected, please try again."),H("Run facial recognition"),ue(!1);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ge=function(){var t=1;C.a.database().ref("Users").on("child_added",(function(n){var a=n.val(),c=1;null!=a.descriptor&&(c=V.b(a.descriptor,e)),c<t&&c<.5&&(t=c,T(!0),_(a.name),Y(a.phone),ne(a.snap),oe(a.insta),I(""))}))};return Object(a.useEffect)((function(){C.a.database().ref("Users/"+x.googleId).once("value",(function(e){e.exists()||(f.push("/profile"),alert("Please fill out your profile first!"))}))}),[]),Object(h.jsx)("div",{className:"App",style:{textAlign:"center"},children:Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)(y.GoogleLogout,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(){return he.apply(this,arguments)}}),Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:m.button,startIcon:Object(h.jsx)($.a,{}),onClick:function(){f.push("/profile")},children:"Profile"}),Object(h.jsx)(U.a,{variant:"contained",color:"secondary",size:"small",startIcon:Object(h.jsx)(ee.a,{}),onClick:function(){return window.open("https://venmo.com/code?user_id=3203314787287040028&created=1631377064","_blank")},children:"Donate"}),Object(h.jsxs)("div",{children:[Object(h.jsx)(L.a,{ref:fe,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(S.a)(Object(S.a)({},r),{},{facingMode:d}),mirrored:d===t}),Object(h.jsx)(U.a,{variant:"contained",color:"primary",size:"small",className:m.button,onClick:function(){return H("Running facial recognition..."),ue(!0),_(""),Y(""),ne(""),oe(""),T(!1),void pe()},children:E}),le?null:Object(h.jsx)(A.a,{onClick:b,children:Object(h.jsx)(F.a,{})})]}),Object(h.jsx)("hr",{}),Object(h.jsx)("p",{children:N}),z?Object(h.jsxs)("div",{style:{border:"2px solid black",backgroundColor:"lightgray",paddingTop:"10px"},children:[Object(h.jsx)("p",{children:"Name: "+B}),Object(h.jsxs)("p",{children:["Phone number: ",Object(h.jsx)("a",{href:de,children:q})]}),Object(h.jsxs)("p",{children:["Snapchat:  ",Object(h.jsx)("a",{href:be,children:X})]}),Object(h.jsxs)("p",{children:["Instagram: ",Object(h.jsx)("a",{href:je,children:re})]})]}):null,Object(h.jsx)("br",{})]})})},ae=n(70);var ce=function(){var e=Object(ae.b)(),t=e.pwaInstall,n=e.supported,c=e.isInstalled,r=Object(a.useState)(!1),o=Object(u.a)(r,2),i=o[0],j=o[1];function b(){return(b=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.e("/nametag/models");case 2:return e.next=4,V.c("/nametag/models");case 4:return e.next=6,V.d("/nametag/models");case 6:j(!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){n()&&!c()&&t({title:"Install Nametag to device",logo:"./myLogo.png"}).then((function(){return console.log("App installed successfully or instructions for install shown")})).catch((function(){return console.log("User opted out from installing")}))}return Object(a.useEffect)((function(){f(),function(){b.apply(this,arguments)}()})),Object(h.jsx)(d.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:i?Object(h.jsx)("div",{className:"w-100",style:{maxWidth:"400px"},children:Object(h.jsx)(x.a,{basename:"/nametag",children:Object(h.jsx)(g,{children:Object(h.jsxs)(v.d,{children:[Object(h.jsx)(K,{exact:!0,path:"/",component:ne}),Object(h.jsx)(K,{path:"/profile",component:Q}),Object(h.jsx)(v.b,{path:"/login",component:k})]})})})}):null})},re=(n(136),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function oe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,165)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(h.jsx)(ae.a,{enableLogging:!0,children:Object(h.jsx)(ce,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/nametag",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/nametag","/service-worker.js");re?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):oe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):oe(t,e)}))}}(),ie()}},[[137,1,2]]]);
//# sourceMappingURL=main.82108a61.chunk.js.map