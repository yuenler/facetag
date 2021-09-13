import React, {useEffect} from "react"
import {  Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import icon from './icon192.png'

export default function LoginScreen() {
  const { changeUser } = useAuth()
  const history = useHistory()

  async function handleLogin(res) {
      console.log('done')
      let email = res.profileObj.email
      var idxHarvard = email.indexOf('@college.harvard.edu');
      if (idxHarvard === -1) {
        alert("Please sign in using your Harvard College email address!");
        await changeUser(null)
        email = null
      }
      else{
        await changeUser(res.profileObj.googleId)
        localStorage.setItem('user', res.profileObj.googleId)
        history.push("/")
      }      
  }

  const responseGoogle = response => {
    console.log(response);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      changeUser(loggedInUser);
      history.push("/")
    }
  }, []);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <img src={icon}/>
      </div>
      <Card style={{backgroundColor: '#A51C30'}}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{color: 'white'}}>FaceTag</h2>
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <GoogleLogin
                clientId='686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com'
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </div>

        </Card.Body>
      </Card>
    </div>

  )
}
