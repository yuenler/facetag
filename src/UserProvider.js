import React, {useState, useEffect,  createContext} from "react";
import { auth } from "./firebase"

export const UserContext = createContext({user: null});
export default (props) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        if(user){
            const { displayName, email, uid} = user;
            setUser({
                displayName,
                email,
                uid,
            })
        }
        else{
          setUser({
            displayName: null,
            email: null,
            uid: null,
        })
        }
    });
}, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}