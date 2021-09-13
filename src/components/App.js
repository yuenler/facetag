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
import icon192 from './icon192.png'
import hermione from './hermione.jpg';


function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoaded2, setIsLoaded2] = useState(false)
  const [isLoaded3, setIsLoaded3] = useState(false)

  const [isRan, setIsRan] = useState(false)

  const handlePopup = () => {
    pwaInstall({
      title: "Install Facetag to device",
      logo: icon192,
    })
      .then(() => console.log("App installed successfully or instructions for install shown"))
      .catch(() => console.log("User opted out from installing"));
  };

  async function loadModels () {
    await faceapi.loadSsdMobilenetv1Model('/models');
    setIsLoaded(true)
    await faceapi.loadFaceLandmarkModel('/models');
    setIsLoaded2(true)
    await faceapi.loadFaceRecognitionModel('/models');
    setIsLoaded3(true)
    const input = document.getElementById('myImg')
    await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor()
    setIsRan(true)
    pwaOption()
  }
  
  function pwaOption(){
    if (supported() && !isInstalled()) { 
      handlePopup()
    }
}


  useEffect(() => {
    loadModels()
  },[]);
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {!isLoaded? 
          <p>Loading face detector model...</p>: null
            }

        {(isLoaded && !isLoaded2)? 
          <div>
            <p>Successfully loaded face detector model.</p>
          <p>Loading facial landmark detection model...</p>
          </div>: null
            }

        {(isLoaded && isLoaded2 && !isLoaded3)? 
          <div
          ><p>Successfully loaded face detector model.</p>
          <p>Successfully facial landmark detection model.</p>
          <p>Loading face descriptor model...</p>
          </div>: null
            }

        {(isLoaded && isLoaded2 && isLoaded3 && !isRan)?
        <div  style={{textAlign: 'center'}}>
        <p>Warming up facial recognition models with Hermione Granger...</p>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <img id='myImg' src={hermione} width="150" height="150"  ></img>
        </div>
        </div>
        : null
        }
      {isRan?
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
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
