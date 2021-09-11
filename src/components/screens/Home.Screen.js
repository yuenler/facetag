import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import { useHistory } from "react-router-dom"
import { GoogleLogout } from 'react-google-login';
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlipCameraIos from '@material-ui/icons/FlipCameraIos';


// document.getElementsByTagName("body")[0].style.backgroundColor = "black";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function HomeScreen() {

  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const videoConstraints = {
    facingMode: FACING_MODE_USER
  };

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

    const handleClick = React.useCallback(() => {
      setFacingMode(
        prevState =>
          prevState === FACING_MODE_USER
            ? FACING_MODE_ENVIRONMENT
            : FACING_MODE_USER
      );
    }, []);

  const history = useHistory()
  const { changeUser, currentUser } = useAuth()
  const classes = useStyles()
  const [prediction, setPrediction] = useState("Hold the phone so that the person's face takes up the majority of the screen, but no part of their head is cut off. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the button above.");
  const [predictionOut, setPredictionOut] = useState(false);

  const [buttonText, setButtonText] = useState("Run facial recognition")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] = useState("");
  const [insta, setInsta] = useState("");
  const [startedRunning, setStartedRunning] = useState(false)

  const phoneRef = "sms:" + phone;
  const instaRef = "instagram://user?username=" + insta;
  const snapRef = "snapchat://add/" + snap;
  const webcamRef = useRef(null);



  function handleProfile() {
    history.push("/profile")
  }

  const handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };

  const checkProfileExistence = () => {
    firebase.database().ref('Users/' + currentUser.googleId).once("value", snapshot => {
      if (!snapshot.exists()){
         history.push("/profile")
         alert('Please fill out your profile first!')
      }
   });
  }


  let descriptor;

  const handleRunFaceapi = () => {
    setButtonText("Running facial recognition...");
    setStartedRunning(true)
    setName("");
    setPhone("");
    setSnap("");
    setInsta("");
    setPredictionOut(false);
    runFaceapi()
  }


  async function logout() {
    await changeUser(null)
    history.push("/login")
  }

  const runFaceapi = async () => {
      descriptor = null;
      await detect()
  };


  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      setPrediction('Analyzing face...')
      const detectionWithDescriptors = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor()
      if(detectionWithDescriptors != null){
        descriptor = detectionWithDescriptors.descriptor;
        setButtonText("Run facial recognition")
        setPrediction("The scanned face does not match any face in our database.")
        compareFaces();
        setStartedRunning(false)
      
      }
      else{
        setPrediction('No face detected, please try again.')
      }
     
    }
  };

  const compareFaces = () => {
    let closest = 1
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let user = snapshot.val()
      let distance = 1;
      if (user.descriptor != null){
       distance = faceapi.euclideanDistance(user.descriptor, descriptor)
      }
      if (distance < closest && distance < 0.5){
        closest = distance
        setPredictionOut(true)
        setName(user.name)
        setPhone(user.phone)
        setSnap(user.snap)
        setInsta(user.insta)
        setPrediction('')
      }
    })	
  }

  useEffect(() => {
    checkProfileExistence()
  },[]);

  return (
    <div className="App" style={{textAlign: 'center', /*backgroundColor: "black", color: "white" */}}>
      <header className="App-header">

      <GoogleLogout
        clientId="686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AccountCircle />}
        onClick={() => handleProfile() }
      >
        Edit Profile
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<MonetizationOn />}
        onClick={() => window.open("https://venmo.com/code?user_id=3203314787287040028&created=1631377064", "_blank") }
      >
        Donate
      </Button>

      <div>
         
          <Webcam
            ref={webcamRef}
            style={{
              // position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 300,
              height: 300,
            }}
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
            mirrored={facingMode === FACING_MODE_USER}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={() => handleRunFaceapi() }
            >
            {buttonText}
          </Button>
          {!startedRunning?
      <IconButton onClick={handleClick}>
        <FlipCameraIos/>
        </IconButton>: null
      }


      </div>
      <hr/>
      <p>{prediction}</p>
      {predictionOut?
        <div style={{border: "2px solid black", backgroundColor: "lightgray", paddingTop: "10px"}}>
          <p>{"Name: " + name}</p>
          <p>Phone number: <a href={phoneRef}>{phone}</a></p>
          <p>Snapchat:  <a href={snapRef}>{snap}</a></p>
          <p>Instagram: <a href={instaRef}>{insta}</a></p>
        </div>
        : null
      }
      <br/>
      </header>
    </div>

  );
}

export default HomeScreen;