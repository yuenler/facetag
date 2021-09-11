import React, {useEffect} from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginScreen from "./Login"
import ProfileScreen from "./screens/Profile.Screen"
import PrivateRoute from "./PrivateRoute"
import HomeScreen from "./screens/Home.Screen"
import * as faceapi from 'face-api.js';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';



function App() {

  async function loadModels () {
    await faceapi.loadSsdMobilenetv1Model('/nametag/models');
    await faceapi.loadFaceLandmarkModel('/nametag/models');
    await faceapi.loadFaceRecognitionModel('/nametag/models');
  }

  useEffect(() => {
    loadModels()
  });
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <AddToHomeScreen />
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
      </div>
    </Container>
  )
}

export default App
