import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    backgroundColor: "#A51C30",
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
  const classes = useStyles();
  const [prediction, setPrediction] = useState("Hold the phone so that the person's face takes up the majority of the screen, but no part of their head is off screen. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the button above.");
  const [predictionOut, setPredictionOut] = useState(false);

  const [buttonText, setButtonText] = useState("Run facial recognition")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [snap, setSnap] = useState("");
  const [insta, setInsta] = useState("");
  const [startedRunning, setStartedRunning] = useState(false)
  const phoneSMS = "sms:" + phone;
  const webcamRef = useRef(null);
  const NUM_READINGS = 1;

  function handleProfile() {
    history.push("/profile")
  }

  const checkProfileExistence = () => {
    // firebase.database().ref('Users/' + currentUser.googleId).once("value", snapshot => {
    //   if (!snapshot.exists()){
    //      history.push("/profile")
    //      alert('Please fill out your profile first!')
    //   }
  //  });
  }


  let descriptors = [];
  let averageDescriptor;
  let interval;

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
    await faceapi.loadSsdMobilenetv1Model('/nametag/models');
    await faceapi.loadFaceLandmarkModel('/nametag/models');
    await faceapi.loadFaceRecognitionModel('/nametag/models');
    while (descriptors.length <= NUM_READINGS){
      await detect()
    }
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
        if (descriptors.length >= NUM_READINGS){
          clearInterval(interval);
          // setOpenCamera(false)
          setButtonText("Run facial recognition")
          if (descriptors.length === NUM_READINGS){
            setPrediction("Processing results...\nIf no results appear within 10 seconds, this means that the scanned face does not match any face in our database.")
            averageDescriptor = takeAverage(descriptors);
            compareFaces();
            setStartedRunning(false)
          }

        }
      
      }
     
    }
  };

  const compareFaces = () => {
    let closest = 1
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let user = snapshot.val()
      let distance = faceapi.euclideanDistance(user.descriptor, averageDescriptor)
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
  });

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
          <p>Phone number: <a href={phoneSMS}>{phone}</a></p>
          <p>{"Snapchat: " + snap}</p>
          <p>{"Instagram: " + insta}</p>
        </div>
        : null
      }
      <br/>
      </header>
    </div>

  );
}

export default HomeScreen;