
import React, { useRef, useEffect } from "react";
// import "./App.css";
// import * as tf from "@tensorflow/tfjs";


import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

import * as faceapi from 'face-api.js';

function HomeScreen() {
  const webcamRef = useRef(null);

  const runFaceapi = async () => {
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');
    setInterval(() => {
      detect();
    }, 10);
  };

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const detectionWithLandmarks = await faceapi.detectSingleFace(video).withFaceLandmarks()
      if(detectionWithLandmarks != null){
      console.log(detectionWithLandmarks.landmarks._positions);
      }
     
    }
  };

  useEffect(()=>{runFaceapi()}, []);
  return (
    <div className="App">
      <header className="App-header">
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
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>

  );
}

export default HomeScreen;