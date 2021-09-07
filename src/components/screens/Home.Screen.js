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


function HomeScreen() {

  const history = useHistory()
  const { changeUser } = useAuth()

  const [openCamera, setOpenCamera] = useState(false);


  function handleProfile() {
    history.push("/profile")
  }


  const webcamRef = useRef(null);

  let descriptors = [];
  let averageDescriptor;
  let interval;
  let closestFace = {
    distance: 0,
    name: null,
    phone: null,
    snap: null,
    insta: null,
  };

  const handleCamera = () => {
    setOpenCamera(true)
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
      if (distance < closestFace.distance){
        closestFace.distance = distance
        closestFace.name = user.name
        closestFace.phone = user.phone
        closestFace.snap = user.snap
        closestFace.insta = user.insta

      }
      console.log('distance ' + distance)
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