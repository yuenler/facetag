(this.webpackJsonpnametag=this.webpackJsonpnametag||[]).push([[0],{103:function(e,t){},104:function(e,t){},105:function(e,t){},111:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),r=n(40),s=n.n(r),i=n(128),o=n(14),l=n(66),u=(n(87),l.a.initializeApp({apiKey:"AIzaSyCUqHmiQD8PkE0UDMsuHjAhrZ9QQNrydeg",authDomain:"nametag-de54e.firebaseapp.com",projectId:"nametag-de54e",storageBucket:"nametag-de54e.appspot.com",messagingSenderId:"686023333837",appId:"1:686023333837:web:80907e123a1eb4f45e5684",measurementId:"G-YYT9G3V3TS"})),j=u.auth(),d=n(6),b=c.a.createContext();function h(){return Object(a.useContext)(b)}function f(e){var t=e.children,n=Object(a.useState)(),c=Object(o.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)(!0),l=Object(o.a)(i,2),u=l[0],h=l[1];Object(a.useEffect)((function(){return j.onAuthStateChanged((function(e){s(e),h(!1)}))}),[]);var f={currentUser:r,changeUser:function(e){s(e)}};return Object(d.jsx)(b.Provider,{value:f,children:!u&&t})}var p=n(39),O=n(16),x=n(18),g=n.n(x),m=n(27),v=n(130),y=n(49),k=function(e){console.log(e)};function S(){var e=h().changeUser,t=Object(O.g)();function n(){return(n=Object(m.a)(g.a.mark((function n(a){var c;return g.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e(a.profileObj);case 2:if(c=a.profileObj.email,-1!==c.indexOf("@college.harvard.edu")){n.next=11;break}return alert("Please sign in using your Harvard College email address!"),n.next=8,e(null);case 8:c=null,n.next=12;break;case 11:t.push("/");case 12:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(d.jsx)(v.a,{style:{backgroundColor:"#A51C30"},children:Object(d.jsxs)(v.a.Body,{children:[Object(d.jsx)("h2",{className:"text-center mb-4",style:{color:"white"},children:"Nametag"}),Object(d.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(d.jsx)(y.GoogleLogin,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Log in with Google",onSuccess:function(e){return n.apply(this,arguments)},onFailure:k,cookiePolicy:"single_host_origin",isSignedIn:!0,uxMode:"popup"})})]})})}var w=n(32),C=n(43),I=n(129),N=n(51),L=n.n(N),A=n(126),R=n(127),U=n(71),P=n.n(U),z=n(69),G=n.n(z),M=n(54),H=n.n(M),E=n(72),F=n.n(E),T=n(68),D=n.n(T),V=n(70),B=n.n(V),J=n(28),Q=n(124),W=Object(Q.a)((function(e){return{button:{margin:e.spacing(1),backgroundColor:"#A51C30"}}}));var _=function(){var e="user",t={facingMode:e},n=c.a.useState(e),r=Object(o.a)(n,2),s=r[0],i=r[1],l=c.a.useCallback((function(){i((function(t){return t===e?"environment":e}))}),[]),u=W(),j=Object(O.g)(),b=h().currentUser,f=Object(a.useRef)(null),p=Object(a.useRef)(),x=Object(a.useRef)(),v=Object(a.useRef)(),y=Object(a.useRef)(),k=[],S=Object(a.useState)(!1),N=Object(o.a)(S,2),U=N[0],z=N[1],M=Object(a.useState)("Run facial recognition"),E=Object(o.a)(M,2),T=E[0],V=E[1],Q=Object(a.useState)(null),_=Object(o.a)(Q,2),q=_[0],Y=_[1],K=Object(a.useState)(!1),Z=Object(o.a)(K,2),X=Z[0],$=Z[1],ee=Object(a.useState)(!0),te=Object(o.a)(ee,2),ne=te[0],ae=te[1],ce=Object(a.useState)(null),re=Object(o.a)(ce,2),se=re[0],ie=re[1],oe=Object(a.useState)(null),le=Object(o.a)(oe,2),ue=le[0],je=le[1],de=Object(a.useState)(null),be=Object(o.a)(de,2),he=be[0],fe=be[1],pe=Object(a.useState)(null),Oe=Object(o.a)(pe,2),xe=Oe[0],ge=Oe[1],me=Object(a.useState)(!1),ve=Object(o.a)(me,2),ye=ve[0],ke=ve[1];function Se(){return(Se=Object(m.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.e("/nametag/models");case 2:return e.next=4,J.c("/nametag/models");case 4:return e.next=6,J.d("/nametag/models");case 6:ke(!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function we(){j.push("/")}var Ce=function(){""===p.current.value||null==q?alert("Please scan your face and fill in your name."):(C.a.database().ref("Users/"+b.googleId).set({descriptor:q,name:p.current.value,phone:x.current.value,insta:v.current.value,snap:y.current.value},(function(e){console.log(e)})),we(),alert("Successfully saved data!"))},Ie=function(){$(!1),ae(!1),z(!0),function(){Se.apply(this,arguments)}()},Ne=function(){z(!1),ae(!0)},Le=function(){var e=Object(m.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(k.length<=5)){e.next=5;break}return e.next=3,Re();case 3:e.next=0;break;case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ae=function(e){for(var t=[],n=0;n<128;n++){for(var a,c=0,r=0;r<e.length;r++)c+=e[r][n];a=c/e.length,t.push(a)}return t},Re=function(){var e=Object(m.a)(g.a.mark((function e(){var t,n,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof f.current||null===f.current||4!==f.current.video.readyState){e.next=6;break}return t=f.current.video,e.next=4,J.a(t).withFaceLandmarks().withFaceDescriptor();case 4:null!=(n=e.sent)&&(k.push(n.descriptor),k.length>=5&&(clearInterval(undefined),V("Run facial recognition"),5===k.length&&(a=Ae(k),Y(a),$(!0),ae(!1))));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){C.a.database().ref("Users/"+b.googleId).once("value",(function(e){e.exists()&&(Y(e.val().descriptor),ie(e.val().name),je(e.val().phone),fe(e.val().insta),ge(e.val().snap))}))})),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)(A.a,{"aria-label":"home",onClick:function(){we()},children:Object(d.jsx)(D.a,{})}),ne?null:Object(d.jsx)(A.a,{"aria-label":"clear",onClick:function(){Ne()},children:Object(d.jsx)(G.a,{})}),U&&!ye?Object(d.jsx)("p",{children:"Loading facial recognition models..."}):null,U&&ye?Object(d.jsxs)("div",{children:[Object(d.jsx)(L.a,{ref:f,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(w.a)(Object(w.a)({},t),{},{facingMode:s}),mirrored:s===e}),X?Object(d.jsx)("div",{children:Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:u.button,onClick:function(){return Ne()},children:"Finish"})}):Object(d.jsxs)("div",{children:[Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:u.button,onClick:function(){return ae(!0),V("Running facial recognition..."),void Le()},children:T}),ne?null:Object(d.jsx)(A.a,{onClick:l,children:Object(d.jsx)(H.a,{})})]}),Object(d.jsx)("p",{children:"Hold the phone so that your face takes up the majority of the screen, but no parts of your head is cut off. Make sure you have good lighting and that you are not holding the phone at an angle. When you are ready, click the button above. "})]}):Object(d.jsxs)("div",{children:[Object(d.jsx)("p",{children:"The following inputs will be public to all Harvard College students when they scan your face. Please leave any field for which you do not want to be publicly available blank."}),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:u.button,startIcon:Object(d.jsx)(B.a,{}),onClick:function(){return Ie()},children:"Open Camera to scan face"}),q?Object(d.jsx)(P.a,{}):Object(d.jsx)(F.a,{}),Object(d.jsxs)("div",{children:[Object(d.jsxs)(I.a.Group,{id:"name",children:[Object(d.jsx)(I.a.Label,{children:"Name"}),Object(d.jsx)(I.a.Control,{ref:p,defaultValue:se,placeholder:"John Harvard",required:!0})]}),Object(d.jsxs)(I.a.Group,{id:"phone",children:[Object(d.jsx)(I.a.Label,{children:"Phone number"}),Object(d.jsx)(I.a.Control,{placeholder:"555-555-5555",defaultValue:ue,ref:x})]}),Object(d.jsxs)(I.a.Group,{id:"insta",children:[Object(d.jsx)(I.a.Label,{children:"Instagram"}),Object(d.jsx)(I.a.Control,{placeholder:"username",defaultValue:he,ref:v})]}),Object(d.jsxs)(I.a.Group,{id:"snap",children:[Object(d.jsx)(I.a.Label,{children:"Snapchat"}),Object(d.jsx)(I.a.Control,{placeholder:"username",defaultValue:xe,ref:y})]})]}),Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:u.button,onClick:function(){Ce()},children:"Save Profile"})]})]})]})})},q=n(74);function Y(e){var t=e.component,n=Object(q.a)(e,["component"]),a=h().currentUser;return Object(d.jsx)(O.b,Object(w.a)(Object(w.a)({},n),{},{render:function(e){return a?Object(d.jsx)(t,Object(w.a)({},e)):Object(d.jsx)(O.a,{to:"/login"})}}))}var K=n(73),Z=n.n(K),X=Object(Q.a)((function(e){return{button:{margin:e.spacing(1),backgroundColor:"#A51C30"}}}));var $=function(){var e,t="user",n="environment",r={facingMode:t},s=c.a.useState(n),i=Object(o.a)(s,2),l=i[0],u=i[1],j=c.a.useCallback((function(){u((function(e){return e===t?n:t}))}),[]),b=Object(O.g)(),f=h(),p=f.changeUser,x=f.currentUser,v=X(),k=Object(a.useState)("Hold the phone so that the person's face takes up the majority of the screen, but no part of their head is off screen. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the button above."),S=Object(o.a)(k,2),I=S[0],N=S[1],U=Object(a.useState)(!1),P=Object(o.a)(U,2),z=P[0],G=P[1],M=Object(a.useState)("Run facial recognition"),E=Object(o.a)(M,2),F=E[0],T=E[1],D=Object(a.useState)(""),V=Object(o.a)(D,2),B=V[0],Q=V[1],W=Object(a.useState)(""),_=Object(o.a)(W,2),q=_[0],Y=_[1],K=Object(a.useState)(""),$=Object(o.a)(K,2),ee=$[0],te=$[1],ne=Object(a.useState)(""),ae=Object(o.a)(ne,2),ce=ae[0],re=ae[1],se=Object(a.useState)(!1),ie=Object(o.a)(se,2),oe=ie[0],le=ie[1],ue=Object(a.useState)(!1),je=Object(o.a)(ue,2),de=je[0],be=je[1],he="sms:"+q,fe="instagram://user?username="+ce,pe="snapchat://add/"+ee,Oe=Object(a.useRef)(null),xe=[];function ge(){return(ge=Object(m.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.e("/nametag/models");case 2:return e.next=4,J.c("/nametag/models");case 4:return e.next=6,J.d("/nametag/models");case 6:be(!0);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function me(){return(me=Object(m.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p(null);case 2:b.push("/login");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ve=function(){var e=Object(m.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(xe.length<1)){e.next=5;break}return e.next=3,ke();case 3:e.next=0;break;case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ye=function(e){for(var t=[],n=0;n<128;n++){for(var a,c=0,r=0;r<e.length;r++)c+=e[r][n];a=c/e.length,t.push(a)}return t},ke=function(){var t=Object(m.a)(g.a.mark((function t(){var n,a;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("undefined"===typeof Oe.current||null===Oe.current||4!==Oe.current.video.readyState){t.next=6;break}return n=Oe.current.video,t.next=4,J.a(n).withFaceLandmarks().withFaceDescriptor();case 4:null!=(a=t.sent)&&(xe.push(a.descriptor),xe.length>=1&&(clearInterval(undefined),T("Run facial recognition"),1===xe.length&&(N("Processing results...\nIf no results appear within 10 seconds, this means that the scanned face does not match any face in our database."),e=ye(xe),Se(),le(!1))));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Se=function(){var t=1;C.a.database().ref("Users").on("child_added",(function(n){var a=n.val(),c=1;null!=a.descriptor&&(c=J.b(a.descriptor,e)),c<t&&c<.5&&(t=c,G(!0),Q(a.name),Y(a.phone),te(a.snap),re(a.insta),N(""))}))};return Object(a.useEffect)((function(){C.a.database().ref("Users/"+x.googleId).once("value",(function(e){e.exists()||(b.push("/profile"),alert("Please fill out your profile first!"))})),function(){ge.apply(this,arguments)}()})),Object(d.jsx)("div",{className:"App",style:{textAlign:"center"},children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)(y.GoogleLogout,{clientId:"686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(){return me.apply(this,arguments)}}),Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:v.button,startIcon:Object(d.jsx)(Z.a,{}),onClick:function(){b.push("/profile")},children:"Edit Profile"}),Object(d.jsx)("div",{children:de?Object(d.jsxs)("div",{children:[Object(d.jsx)(L.a,{ref:Oe,style:{marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:300,height:300},videoConstraints:Object(w.a)(Object(w.a)({},r),{},{facingMode:l}),mirrored:l===t}),Object(d.jsx)(R.a,{variant:"contained",color:"primary",size:"small",className:v.button,onClick:function(){return T("Running facial recognition..."),le(!0),Q(""),Y(""),te(""),re(""),G(!1),void ve()},children:F}),oe?null:Object(d.jsx)(A.a,{onClick:j,children:Object(d.jsx)(H.a,{})})]}):Object(d.jsx)("p",{children:"Loading facial recognition models..."})}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{children:I}),z?Object(d.jsxs)("div",{style:{border:"2px solid black",backgroundColor:"lightgray",paddingTop:"10px"},children:[Object(d.jsx)("p",{children:"Name: "+B}),Object(d.jsxs)("p",{children:["Phone number: ",Object(d.jsx)("a",{href:he,children:q})]}),Object(d.jsxs)("p",{children:["Snapchat:  ",Object(d.jsx)("a",{href:pe,children:ee})]}),Object(d.jsxs)("p",{children:["Instagram: ",Object(d.jsx)("a",{href:fe,children:ce})]})]}):null,Object(d.jsx)("br",{})]})})};var ee=function(){return Object(d.jsx)(i.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:Object(d.jsx)("div",{className:"w-100",style:{maxWidth:"400px"},children:Object(d.jsx)(p.a,{basename:"/nametag",children:Object(d.jsx)(f,{children:Object(d.jsxs)(O.d,{children:[Object(d.jsx)(Y,{exact:!0,path:"/",component:$}),Object(d.jsx)(Y,{path:"/profile",component:_}),Object(d.jsx)(O.b,{path:"/login",component:S})]})})})})})};n(109);s.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(ee,{})}),document.getElementById("root"))}},[[111,1,2]]]);
//# sourceMappingURL=main.3b58d2a0.chunk.js.map