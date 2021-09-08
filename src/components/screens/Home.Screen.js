import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { Link, useHistory } from "react-router-dom"
import { GoogleLogout } from 'react-google-login';
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function HomeScreen() {

  const history = useHistory()
  const { changeUser } = useAuth()
  const classes = useStyles();
  const [openCamera, setOpenCamera] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [closestDistance, setClosestDistance] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] = useState("");
  const [insta, setInsta] = useState("");
  const webcamRef = useRef(null);


  function handleProfile() {
    history.push("/profile")
  }



  let descriptors = [];
  let averageDescriptor;
  let interval;

  const handleCamera = () => {
    setOpenCamera(true)
  }

  const handleRunFaceapi = () => {
    runFaceapi()
  }

  async function logout() {
    await changeUser(null)
    history.push("/login")
  }

  const runFaceapi = async () => {
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');
    await faceapi.loadFaceRecognitionModel('/models');
    interval = setInterval(detect, 100);
  };

  const takeAverage = (descriptors) => {
    let averages = []
   
    for(let i = 0; i < 128; i++) {
      let sum = 0;
      let average;
      for(let j = 0; j < descriptors.length; j++) {
        sum += descriptors[j][i];
      }
      average = sum/descriptors.length;
      
      averages.push(average);
    }

    return averages;
  }

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const detectionWithDescriptors = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor()
      if(detectionWithDescriptors != null){
        descriptors.push(detectionWithDescriptors.descriptor);
        if (descriptors.length >= 10){
          clearInterval(interval);
          setOpenCamera(false)
          setPrediction("Processing results...")
          if (descriptors.length == 10){
            averageDescriptor = takeAverage(descriptors);
            compareFaces();
          }

        }
      
      }
     
    }
  };

  const compareFaces = () => {
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let user = snapshot.val()
      let distance = faceapi.euclideanDistance(user.descriptor, averageDescriptor)
      if (distance < closestDistance){
        setClosestDistance(distance)
        setName(user.name)
        setPhone(user.phone)
        setSnap(user.snap)
        setInsta(user.insta)
        setPrediction('Closest face: ')
      }
    })	
  }

  return (
    <div className="App">
      <header className="App-header">

      <GoogleLogout
      clientId="686023333837-p65ka8pm804ual7o284tholp22pll81s.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>

      <IconButton aria-label="user" onClick={() => { handleProfile() }}>
        <AccountCircle />
      </IconButton>

      <IconButton aria-label="camera" onClick={() => handleCamera() }>
        <CameraAlt />
      </IconButton>
      {openCamera?
        <div>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 300,
            height: 300,
          }}
        />
        <text>Hold the phone so that the person's face takes up the majority of the screen, but no parts of their head is off screen. Make sure you have good lighting and that you are holding the camera not at an angle. When you are ready, click the button below. </text>

        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => handleRunFaceapi() }
      >
        Run facial recognition
      </Button>
      </div>
        : null
      }
      <text>{prediction}</text>
      <text>{name}</text>
      <text>{phone}</text>
      <text>{snap}</text>
      <text>{insta}</text>

      </header>
    </div>

  );
}

export default HomeScreen;