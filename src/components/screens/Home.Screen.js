import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';

import Favorite from '@material-ui/icons/Favorite';
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
  const [startedRunning, setStartedRunning] = useState(false)
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [names, setNames] = useState([]);
  const [phones, setPhones] = useState([]);
  const [snaps, setSnaps] = useState([]);
  const [instas, setInstas] = useState([]);
  const [distances, setDistances] = useState([]);

  let descriptor;

  const phoneRef = "sms:" + phones[predictionIndex];
  const instaRef = "instagram://user?username=" + instas[predictionIndex];
  const snapRef = "snapchat://add/" + snaps[predictionIndex];
  const webcamRef = useRef(null);

  function handleProfile() {
    history.push("/profile")
  }

  const checkProfileExistence = () => {
    firebase.database().ref('Users/' + currentUser).once("value", snapshot => {
      if (!snapshot.exists()){
         history.push("/profile")
         alert('Please fill out your profile first!')
      }
   });
  }

  const handleRunFaceapi = () => {
    setButtonText("Running facial recognition...");
    setStartedRunning(true)
    setNames([]);
    setPhones([]);
    setSnaps([]);
    setInstas([]);
    setDistances([]);
    setPredictionOut(false);
    runFaceapi()
    
  }

  const handleLeft = () => {
    if (predictionIndex === 0){
      setPredictionIndex(distances.length - 1);
    }
    else{
      setPredictionIndex(predictionIndex - 1);
    }
  }

  const handleRight = () => {
    if (predictionIndex === distances.length - 1){
      setPredictionIndex(0);
    }
    else{
      setPredictionIndex(predictionIndex + 1);
    }
  }


  async function logout() {
    await changeUser(null)
    localStorage.removeItem('user')
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
        setPrediction("Processing...If no prediction appears in a few seconds, this means that the scanned face does not match any face in our database.")
        compareFaces();
      }
      else{
        setPrediction('No face detected, please try again. If nothing works, try reloading the page.')
      }
      setButtonText("Run facial recognition")
      setStartedRunning(false)
     
    }
  };

  const determineInsertionIndex = (distances, distance) => {
    let index = 0
    if (distances.length === 0){
      return index
    }

    while (distances[index] < distance){
      index++
    }
    return index
  }

  const compareFaces = () => {
    var names = [];
    var phones = [];
    var snaps = [];
    var instas = [];
    var distances = [];
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let user = snapshot.val()
      let distance = 1;
      if (user.descriptor != null){
       distance = faceapi.euclideanDistance(user.descriptor, descriptor)
      }
      if (distance < 0.5){
        let index = determineInsertionIndex(distances, distance)
        setPredictionIndex(0)
        setPredictionOut(true)
        distances.splice(index,0,distance)
        names.splice(index, 0, user.name); 
        phones.splice(index, 0, user.phone); 
        snaps.splice(index, 0, user.snap); 
        instas.splice(index, 0, user.insta);
        
        setDistances(distances)
        setNames(names)
        setPhones(phones)
        setSnaps(snaps)
        setInstas(instas)
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
        Profile
      </Button>

      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<Favorite />}
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
        <div>
        <div style={{border: "2px solid black", backgroundColor: "#f7cbd1", paddingTop: "10px"}}>
          <p>{String(Math.round((1 - distances[predictionIndex])*100) + "% Match")}</p>
          <p>{"Name: " + names[predictionIndex]}</p>
          <p>Phone number: <a href={phoneRef}>{phones[predictionIndex]}</a></p>
          <p>Snapchat:  <a href={snapRef}>{snaps[predictionIndex]}</a></p>
          <p>Instagram: <a href={instaRef}>{instas[predictionIndex]}</a></p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
        onClick={handleLeft}>
        <ArrowLeft/>
        </IconButton>

        <p>{predictionIndex + 1}</p>

        <IconButton
        onClick={handleRight}
        >
        <ArrowRight/>
        </IconButton>
        </div>
        </div>
        : null
      }
      <br/>
      </header>
    </div>

  );
}

export default HomeScreen;