import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { Form, Card, Alert } from "react-bootstrap"
import Webcam from "react-webcam";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

import Error from '@material-ui/icons/Error';

import Home from '@material-ui/icons/Home';
import CameraAlt from '@material-ui/icons/CameraAlt';
import * as faceapi from 'face-api.js';
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../contexts/AuthContext"



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function ProfileScreen() {
  const classes = useStyles();
  const history = useHistory()
  const { currentUser } = useAuth()
  const webcamRef = useRef(null);
  const nameRef = useRef()
  const phoneRef = useRef()
  const instaRef = useRef()
  const snapRef = useRef()

  let descriptors = [];
  let interval;
  
  const [openCamera, setOpenCamera] = useState(false);
  const [buttonText, setButtonText] = useState("Run facial recognition")
  const [averageDescriptor, setAverageDescriptor] = useState(null)
  const [doneRunning, setDoneRunning] = useState(false)
  const [startedRunning, setStartedRunning] = useState(true)


  function handleHome() {
    history.push("/")
  }

  function handleSubmit() {
    saveData()
  }

  const saveData = () => {
    if (nameRef.current.value === '' || averageDescriptor == null){
      alert("Please scan your face and fill in your name.")
    }
    else{
    firebase.database().ref('Users/' + currentUser.googleId).set({
			descriptor: averageDescriptor,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      insta: instaRef.current.value,
      snap: snapRef.current.value,
		  },
		  (error) => {
				console.log(error);
		  } 
		  );
      handleHome();
      alert('Successfully saved data!')
    }
  }


  const handleCamera = () => {
    setDoneRunning(false)
    setStartedRunning(false)
    setOpenCamera(true)
  }

  const handleLeaveCamera = () => {
    setOpenCamera(false)
    setStartedRunning(true)
  }

  const handleRunFaceapi = () => {
    setStartedRunning(true)
    setButtonText("Running facial recognition...")
    runFaceapi()
  }


  const runFaceapi = async () => {
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');
    await faceapi.loadFaceRecognitionModel('/models');
    interval = setInterval(checkDetect, 100);
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

  const checkDetect = () => {
      detect()
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
          setButtonText("Run facial recognition")
          if (descriptors.length == 10){
            let descriptor = takeAverage(descriptors);
            setAverageDescriptor(descriptor)
            setDoneRunning(true)
            setStartedRunning(false)

          }

        }
      
      }
     
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <IconButton aria-label="home" onClick={() => { handleHome() }}>
        <Home />
      </IconButton>

      { !startedRunning?
        <IconButton aria-label="clear" onClick={() => { handleLeaveCamera() }}>
        <Clear />
      </IconButton>: null
      }

      {openCamera?
        <div>
        <Webcam
          ref={webcamRef}
          style={{
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
    {!doneRunning?
      <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => handleRunFaceapi() }
      >
        {buttonText}
      </Button>

      </div>
      
      :
      <div>
            <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={() => setOpenCamera(false) }
          >
            Finish
            </Button>
      </div>
      }
        <p>Hold the phone so that your face takes up the majority of the screen, but no parts of your head is off screen. Make sure you have good lighting and that you are not holding the phone at an angle. When you are ready, click the button below. </p>
        
      </div>
        :
        <form>
          <p>The following inputs will be public to all Harvard College students when they scan your face. Please leave any field for which you do not want to be publicly available blank.</p>
          <Form>
     
                <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<CameraAlt />}
              onClick={() => handleCamera() }
            >
              Open Camera to scan face
            </Button>

            {
              averageDescriptor ?
              <Check/>:
              <Error/>
            }


            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} required />
            </Form.Group>

            <Form.Group id="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control ref={phoneRef}  />
            </Form.Group>

            <Form.Group id="insta">
              <Form.Label>Instagram</Form.Label>
              <Form.Control ref={instaRef}  />
            </Form.Group>

            <Form.Group id="snap">
              <Form.Label>Snapchat</Form.Label>
              <Form.Control ref={snapRef}  />
            </Form.Group>
            
            <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => handleSubmit() }
      >
        Save Profile
      </Button>
          </Form>
          
        </form>
      }
      </header>
    </div>

  );
}

export default ProfileScreen;