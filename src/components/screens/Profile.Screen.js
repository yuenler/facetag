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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function ProfileScreen() {
  const classes = useStyles();
  const history = useHistory()

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



  const initiateApp = () => {
    runFaceapi()
  }

  function handleHome() {
    history.push("/home")
  }

  async function handleSubmit(e) {
    // e.preventDefault()

    // try {
    //   setError("")
    //   setLoading(true)
    //   await login(emailRef.current.value, passwordRef.current.value)
    //   history.push("/")
    // } catch {
    //   setError("Failed to log in")
    // }

    // setLoading(false)
  }


  const handleCamera = () => {
    setOpenCamera(true)
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
            saveDescriptor(averageDescriptor);
          }

        }
      
      }
     
    }
  };

  const saveDescriptor = (descriptor) => {
    firebase.database().ref('Users/').push({
			descriptor: descriptor,
		  },
		  (error) => {
				console.log(error);
		  } 
		  );
  }


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
        />:
        <form>
          <text>The following inputs will be public to all Harvard College students when they scan your face.</text>
          <Form onSubmit={handleSubmit}>
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
              Log In
            </BootStrapButton>
          </Form>
          
        </form>
      }
      </header>
    </div>

  );
}

export default ProfileScreen;