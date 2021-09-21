import React, {useEffect} from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginScreen from "./Login"
import ProfileScreen from "./screens/Profile.Screen"
import HomeScreen from "./screens/Home.Screen"
import { useReactPWAInstall } from "react-pwa-install";
import UserProvider from "../UserProvider";
import icon from './icon192.png'


function App() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handlePopup = () => {
    pwaInstall({
      title: "Install FaceTag to device",
      logo: icon,
    })
      .then(() => console.log("App installed successfully or instructions for install shown"))
      .catch(() => console.log("User opted out from installing"));
  };

  
  function pwaOption(){
    if (supported() && !isInstalled()) { 
      handlePopup()
    }
}

  useEffect(() => {
    pwaOption()    
  });
  
  return (
    <UserProvider>

    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
            <Switch>
              <Route path="/login" component={LoginScreen} />
              <Route exact path="/" component={HomeScreen} />
              <Route path="/profile" component={ProfileScreen} />
            </Switch>
        </Router>
      </div>
      
    </Container>
    </UserProvider>

  )
}

export default App
