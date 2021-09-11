import React, {useEffect, useState} from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginScreen from "./Login"
import ProfileScreen from "./screens/Profile.Screen"
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./screens/Home.Screen"
import * as faceapi from 'face-api.js';
import { useReactPWAInstall } from "react-pwa-install";


function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [isLoaded, setIsLoaded] = useState(false)
  const handlePopup = () => {
    pwaInstall({
      title: "Install Nametag to device",
      logo: './myLogo.png',
    })
      .then(() => console.log("App installed successfully or instructions for install shown"))
      .catch(() => console.log("User opted out from installing"));
  };

  async function loadModels () {
    await faceapi.loadSsdMobilenetv1Model('/nametag/models');
    await faceapi.loadFaceLandmarkModel('/nametag/models');
    await faceapi.loadFaceRecognitionModel('/nametag/models');
    setIsLoaded(true)
  }
  
  function pwaOption(){
    if (supported() && !isInstalled()) { 
      handlePopup()
    }
}

  useEffect(() => {
    pwaOption()
    loadModels()
  },[]);
  return (
    // {isLoaded?
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {isLoaded?
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router basename="/nametag">
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={HomeScreen} />
              <PrivateRoute path="/profile" component={ProfileScreen} />
              <Route path="/login" component={LoginScreen} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>: null
    }
      
    </Container>
  )
}

export default App
