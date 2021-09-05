import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';


const responseGoogle = response => {
  console.log(response);
};

export default function Login() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleLogin() {
      history.push("/home")
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
              <GoogleLogin
                clientId='686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com'
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </Card.Body>
      </Card>

    </>
  )
}
