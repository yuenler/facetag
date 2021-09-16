import firebase from "firebase/app"
import "firebase/auth"

if (!firebase.apps.length) {
    firebase.initializeApp({
    apiKey: "AIzaSyCUqHmiQD8PkE0UDMsuHjAhrZ9QQNrydeg",
    authDomain: "thefacetag.com",
    projectId: "nametag-de54e",
    storageBucket: "nametag-de54e.appspot.com",
    messagingSenderId: "686023333837",
    appId: "1:686023333837:web:80907e123a1eb4f45e5684",
    measurementId: "G-YYT9G3V3TS"
  })
}

export const auth = firebase.auth();

// export const auth = app.auth()
// export default app

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    // console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export const logOut = () => {
  auth.signOut().then(()=> {
    // console.log('logged out')
  }).catch((error) => {
    console.log(error.message)
  })
}