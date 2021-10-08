import React, { useRef, useEffect, useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/database"

import { Form } from "react-bootstrap"
import Webcam from "react-webcam";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import FlipCameraIos from '@material-ui/icons/FlipCameraIos';
import CameraAlt from '@material-ui/icons/CameraAlt';
import Error from '@material-ui/icons/Error';
import * as faceapi from 'face-api.js';
import {useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import { UserContext } from "../../UserProvider";
import { Redirect } from "react-router-dom";
import { logOut } from "../../firebase";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function ProfileScreen() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const videoConstraints = {
    facingMode: FACING_MODE_USER,
    // aspectRatio: 1,
  };

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const handleClick = React.useCallback(() => {
      setFacingMode(
        prevState =>
          prevState === FACING_MODE_USER
            ? FACING_MODE_ENVIRONMENT
            : FACING_MODE_USER
      );
    }, []);

  

  const classes = useStyles();
  const history = useHistory()
  const webcamRef = useRef(null);
  const nameRef = useRef()
  const phoneRef = useRef()
  const instaRef = useRef()
  const snapRef = useRef()
  
  const [openCamera, setOpenCamera] = useState(false);
  const [prediction, setPrediction] = useState("Click the camera button to scan your face.")
  const [startedRunning, setStartedRunning] = useState(true)
  const [descriptor, setDescriptor] = useState(null);
  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [insta, setInsta] = useState(null)
  const [snap, setSnap] = useState(null)
  const [privateProfile, setPrivateProfile] = useState(false);
  

  function retrieveData() {
    firebase.database().ref('Users/' + user.uid).once("value", snapshot => {
      if (snapshot.exists()){
         setDescriptor(snapshot.val().descriptor)
         setName(snapshot.val().name)
         setPhone(snapshot.val().phone)
         setInsta(snapshot.val().insta)
         setSnap(snapshot.val().snap)
         setPrivateProfile(snapshot.val().private)
      }
   });

  }

  function handleHome() {
    history.push("/")
  }

  function handleSubmit() {
    saveData()
  }

  const saveData = () => {
    if (nameRef.current.value === '' || descriptor == null){
      alert("Please scan your face and fill in your name.")
    }
    else{
    firebase.database().ref('Users/' + user.uid).update({
			descriptor: descriptor,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      insta: instaRef.current.value,
      snap: snapRef.current.value,
      private: privateProfile,
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
    setName(nameRef.current.value);
    setPhone(phoneRef.current.value);
    setInsta(instaRef.current.value);
    setSnap(snapRef.current.value);
    setStartedRunning(false)
    setOpenCamera(true)
  }

  const handleLeaveCamera = () => {
    setOpenCamera(false)
    setStartedRunning(true)
  }

  const handleRunFaceapi = () => {
    setStartedRunning(true)
    runFaceapi()
    
  }

  const runFaceapi = async () => {
      setDescriptor(null);
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
        setDescriptor(detectionWithDescriptors.descriptor);
        setPrediction('Click the camera button to scan your face.')
        setOpenCamera(false);
      }
      else{
        setPrediction('No face detected, please try again.')
      }
      setStartedRunning(false)
     
    }
  };

  
  function isOutsider(email) {
    var idxHarvard = email.indexOf('@college.harvard.edu');
    if (idxHarvard === -1) {
      alert("Please sign in using your Harvard College email address!");
      return true;
    }
    return false;   
} 

  useEffect(() => {
    if (!user || !user.uid) {
      setredirect("/login");
    }
    else if (isOutsider(user.email)){
      logOut()
    }
    else{
      retrieveData()
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  
  return (
    <div style={{color: 'white', height: '100vh', padding: 10, paddingTop: 30}}>

      { !startedRunning?
        <IconButton aria-label="clear" onClick={() => { handleLeaveCamera() }}>
        <Clear style={{color: 'white'}}/>
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
            width: "100%",
          }}
          videoConstraints={{
            ...videoConstraints,
            facingMode
          }}
          mirrored={facingMode === FACING_MODE_USER}
        />
        <div style={{textAlign: 'center'}}>
        <p>{prediction}</p>
        </div>


       <div style={{top: -150, display: 'flex', justifyContent: 'center', position: 'relative'}}>
       <IconButton
         variant="contained"
         className={classes.button}
         onClick={() => handleRunFaceapi() }
         >            
         <CameraAlt style={{width: 70, height: 70, color: '#FFFFFF'}} />
       </IconButton>

       <div style={{position: 'absolute', right: 0, top: 30}}>
       {!startedRunning?
   <IconButton onClick={handleClick}>
     <FlipCameraIos style={{width: 30, height: 30, color: '#FFFFFF'}}/>
     </IconButton>: null
   }
   </div>
   </div>
      

        
        
      </div>

        :
        <div>
          <div style={{display: 'flex'}}>
          
          <div style={{marginRight: 10}}><label>Private profile?</label></div>
          <Toggle
        checked={privateProfile}
        onChange={() => setPrivateProfile(!privateProfile)}
         />
      </div>
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
              descriptor ?
              <Check style={{color: '#0eeb24'}}/>:
              <Error style={{color: 'red'}}/>
            }

            <div>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control ref={nameRef} defaultValue = {name} placeholder="John Harvard" required />
            </Form.Group>

          

            <Form.Group id="phone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control placeholder="555-555-5555" defaultValue = {phone} ref={phoneRef}  />
            </Form.Group>

         

            <Form.Group id="insta">
              <Form.Label>Instagram</Form.Label>
              <Form.Control placeholder="username" defaultValue = {insta} ref={instaRef}  />
            </Form.Group>


            <Form.Group id="snap">
              <Form.Label>Snapchat</Form.Label>
              <Form.Control placeholder="username" defaultValue = {snap} ref={snapRef}  />
            </Form.Group>

            </div>

            <Button
        variant="contained"
        color="default"
        size="small"
        className={classes.button}
        onClick={() => handleHome() }
      >
        Cancel
      </Button>
            
            <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={() => handleSubmit() }
      >
      Save
      </Button>
          </Form>
          
        </div>
      }
    </div>

  );
}

export default ProfileScreen;