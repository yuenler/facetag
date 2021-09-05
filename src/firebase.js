import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCUqHmiQD8PkE0UDMsuHjAhrZ9QQNrydeg",
  authDomain: "nametag-de54e.firebaseapp.com",
  projectId: "nametag-de54e",
  storageBucket: "nametag-de54e.appspot.com",
  messagingSenderId: "686023333837",
  appId: "1:686023333837:web:80907e123a1eb4f45e5684",
  measurementId: "G-YYT9G3V3TS"
})

export const auth = app.auth()
export default app
