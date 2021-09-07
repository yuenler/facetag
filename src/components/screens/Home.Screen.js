import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { Link, useHistory } from "react-router-dom"


function HomeScreen() {

  const history = useHistory()
  const [openCamera, setOpenCamera] = useState(false);


  function handleProfile() {
    history.push("/profile")
  }


  const webcamRef = useRef(null);

  let descriptors = [];
  let averageDescriptor;
  let interval;

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
            compareFaces();
          }

        }
      
      }
     
    }
  };

  const compareFaces = () => {
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let face = snapshot.val()
      let distance = faceapi.euclideanDistance(face.descriptor, averageDescriptor)
      console.log('distance ' + distance)
    })	
  }

  return (
    <div className="App">
      <header className="App-header">
      <IconButton aria-label="user" onClick={() => { handleProfile() }}>
        <AccountCircle />
      </IconButton>

      <IconButton aria-label="camera" onClick={() => handleCamera() }>
        <CameraAlt />
      </IconButton>
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
        />: null
      }
      </header>
    </div>

  );
}

export default HomeScreen;