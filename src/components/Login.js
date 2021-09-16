import React, {useEffect, useContext, useState} from "react"
import {  Card } from "react-bootstrap"
import icon from './icon192.png'
import {signInWithGoogle} from '../firebase'
import { UserContext } from '../UserProvider';
import { Redirect } from "react-router-dom";
import google from './google.png'

export default function LoginScreen() {
  const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)

  useEffect(() => {
    if (user.uid) {
      setredirect('/')
    }
  }, [user])
  if (redirect) {
    return <Redirect to={redirect}/>
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={icon} alt=""/>
      </div>
      <Card style={{backgroundColor: '#A51C30'}}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{color: 'white'}}>FaceTag</h2>
          <div style = {{display: 'flex', justifyContent: 'center'}}>
        <input type="image" onClick={signInWithGoogle} src={google} alt="Sign in with Google"/>
      </div>

        </Card.Body>
      </Card>
    </div>

  )
}
