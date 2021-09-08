import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import { Form, Button as BootStrapButton, Card, Alert } from "react-bootstrap"
import Webcam from "react-webcam";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

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
  console.log(currentUser)
  const webcamRef = useRef(null);
  const nameRef = useRef()
  const phoneRef = useRef()
  const instaRef = useRef()
  const snapRef = useRef()

  let descriptors = [];
  let averageDescriptor;
  let interval;
  
  const [openCamera, setOpenCamera] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  




  const initiateApp = () => {
    runFaceapi()
  }

  function handleHome() {
    history.push("/")
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      saveData()
    } catch {
      setError("Failed to save data. Please try again.")
    }

    setLoading(false)
  }

  const saveData = () => {
    firebase.database().ref('Users/').push({
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
  }


  const handleCamera = () => {
    setOpenCamera(true)
  }

  const handleRunFaceapi = () => {
    runFaceapi()
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
          if (descriptors.length == 10){
            averageDescriptor = takeAverage(descriptors);
          }

        }
      
      }
     
    }
  };


  useEffect(()=>{initiateApp()}, []);

  return (
    <div className="App">
      <header className="App-header">
      <IconButton aria-label="home" onClick={() => { handleHome() }}>
        <Home />
      </IconButton>

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<CameraAlt />}
        onClick={() => handleCamera() }
      >
        Scan face and run face recognition
      </Button>

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

        <text>Hold the phone so that your face takes up the majority of the screen, but no parts of your head is off screen. Make sure you have good lighting and that you are holding the phone not at an angle. When you are ready, click the button below. </text>
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
        :
        <form>
          <text>The following inputs will be public to all Harvard College students when they scan your face. Please leave any field for which you do not want to be publicly available blank.</text>
          <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} required />
            </Form.Group>

            <Form.Group id="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control ref={phoneRef} required />
            </Form.Group>

            <Form.Group id="insta">
              <Form.Label>Instagram</Form.Label>
              <Form.Control ref={instaRef} required />
            </Form.Group>

            <Form.Group id="snap">
              <Form.Label>Snapchat</Form.Label>
              <Form.Control ref={snapRef} required />
            </Form.Group>
            
            <BootStrapButton disabled={loading} className="w-100" type="submit">
              Save Profile
            </BootStrapButton>
          </Form>
          
        </form>
      }
      </header>
    </div>

  );
}

export default ProfileScreen;