import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import firebase from "firebase";

const responseGoogle = response => {
  console.log(response);
};

export default function LoginScreen() {
  const { changeUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { login } = useAuth()

  async function handleLogin(res) {
      await changeUser(res.profileObj)
      let email = res.profileObj.email
      var idxHarvard = email.indexOf('@college.harvard.edu');
      if (idxHarvard == -1) {
        alert("Please sign in using your Harvard College email address!");
        await changeUser(null)
        email = null
      }
      else{
        history.push("/")
      }
      
  }

  return (
    <div>

      <Card style={{backgroundColor: '#A51C30'}}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{color: 'white'}}>Nametag</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div style={{display: 'flex', justifyContent: 'center'}}>
              <GoogleLogin
                clientId='686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com'
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}

            />
            </div>

        </Card.Body>
      </Card>

    </div>
  )
}
