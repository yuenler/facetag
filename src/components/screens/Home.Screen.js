import React, { useRef, useEffect, useState, useContext } from "react";
import firebase from "firebase/app"
import "firebase/database"

import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';

import Favorite from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlipCameraIos from '@material-ui/icons/FlipCameraIos';
import CameraAlt from '@material-ui/icons/CameraAlt';

import { logOut } from "../../firebase";
import { UserContext } from "../../UserProvider";
import { Redirect } from "react-router-dom";

document.getElementsByTagName("body")[0].style.backgroundColor = "#0b0017";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

var distances = [];
var names = [];
var phones = [];
var snaps = [];
var instas = [];
var uids = [];
var privateProfiles = [];
var predictionIndex = 0;
var isFriends = [];
var friends = [];

function HomeScreen() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
 

  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const videoConstraints = {
    facingMode: FACING_MODE_USER,
    aspectRatio: 1,
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
  const classes = useStyles()
  const [prediction, setPrediction] = useState("Hold the phone so that the face of the person you want to scan takes up the majority of the screen, but no part of their head is cut off. Make sure you have good lighting and that you are not holding the camera at an angle. When you are ready, click the shutter.");
  const [predictionOut, setPredictionOut] = useState(false);

  const [startedRunning, setStartedRunning] = useState(false)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [snap, setSnap] = useState('');
  const [insta, setInsta] = useState('');
  const [privateProfile, setPrivateProfile] = useState(false);
  const [uid, setUid] = useState('');
  const [distance, setDistance] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const [predictionIndexPrint, setPredictionIndexPrint] = useState(0);
  let descriptor;
  

  const phoneRef = "sms:" + phones[predictionIndex];
  const instaRef = "instagram://user?username=" + instas[predictionIndex];
  const snapRef = "snapchat://add/" + snaps[predictionIndex];
  const webcamRef = useRef(null);


  function handleProfile() {
    history.push("/profile")
  }

  const checkProfileExistence = () => {
    firebase.database().ref('Users/' + user.uid).once("value", snapshot => {
      if (!snapshot.exists()){
         history.push("/profile")
         alert('Please fill out your profile first!')
      }
      else{
        retrieveFriendData();
      }
   });
  }

  const retrieveFriendData = () => {
    friends = [];
    firebase.database().ref('Users/' + user.uid + '/Friends').on('child_added', (snapshot) => {
      friends.push(snapshot.val().uid)
    });
  }


  const resetVariables = () => {
    setDistance('');
    setName('');
    setPhone('');
    setSnap('');
    setInsta('');
    setUid('');
    setPrivateProfile(false);
    setIsFriend(false);
    setPredictionIndexPrint(0);
    distances = [];
    names = [];
    phones = [];
    snaps = [];
    instas = [];
    uids = [];
    privateProfiles = [];
    isFriends = [];
  }

  const handleRunFaceapi = () => {
    resetVariables()
    setStartedRunning(true)
    setPredictionOut(false);
    runFaceapi()
  }

  const changePerson = (predictionIndex) => {
    setDistance(distances[predictionIndex])
    setUid(uids[predictionIndex])
    setName(names[predictionIndex])
    setPhone(phones[predictionIndex])
    setSnap(snaps[predictionIndex])
    setInsta(instas[predictionIndex])
    setPrivateProfile(privateProfiles[predictionIndex])
    setIsFriend(isFriends[predictionIndex])
    setPredictionIndexPrint(predictionIndex)
    setPrediction('');
  }

  const handleLeft = () => {
    if (predictionIndex === 0){
      predictionIndex = distances.length - 1;
    }
    else{
      predictionIndex = predictionIndex - 1;
    }
    changePerson(predictionIndex)
    
  }

  const handleRight = () => {

    if (predictionIndex === distances.length - 1){
      predictionIndex = 0;
    }
    else{
      predictionIndex = predictionIndex + 1;
    }
    changePerson(predictionIndex);
  }

  const handleSendRequest = (currentUid) => {
    var sendTime = Date.now()
    firebase.database().ref('Users/' + currentUid).update({
			lastRequest: sendTime,
		  },
		  (error) => {
				console.log(error);
		  } 
		  );
      checkAcceptance(currentUid);
      alert("Profile request sent!")
    }

  
  const checkAcceptance = (currentUid) => {
    firebase.database().ref('Users/' + currentUid).on("value", snapshot => {
        var latestAcceptance = snapshot.val().latestAcceptance;
        if (latestAcceptance != null){
          var timeDiff = Date.now() - latestAcceptance;
          if (timeDiff < 1000){
            if (currentUid === uid){
              setPrivateProfile(false)
            }
          }
        }

   });
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
    console.log(friends)
    firebase.database().ref('Users').on('child_added', (snapshot) => {
      let user = snapshot.val()
      let uid = snapshot.key
      let distance = 1;
      if (user.descriptor != null){
       distance = faceapi.euclideanDistance(user.descriptor, descriptor)
      }
      if (distance < 0.5){
        let index = determineInsertionIndex(distances, distance)
        setPredictionOut(true)
        let isFriend = friends.includes(uid) && (uid !== user.uid);

        distances.splice(index,0,distance)
        names.splice(index, 0, user.name); 
        phones.splice(index, 0, user.phone); 
        snaps.splice(index, 0, user.snap); 
        instas.splice(index, 0, user.insta);
        uids.splice(index, 0, uid);
        privateProfiles.splice(index, 0, user.private)
        isFriends.splice(index, 0, isFriend)
        
        predictionIndex = 0
        changePerson(predictionIndex);
      }
    })
  }

  const addFriend = (uid) => {
        firebase.database().ref('Users/' + user.uid + '/Friends').push({
          uid: uid
          },
          (error) => {
            console.log(error);
          } 
          );     
          
        firebase.database().ref('Users/' + uid + '/Friends').push({
          uid: user.uid
          },
          (error) => {
            console.log(error);
          } 
          );  
  }

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
      logOut();
    }
    else{
      checkProfileExistence();
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  

  return (
    <div className="App" style={{textAlign: 'center', margin: 0, padding: 0, color: "white" }}>
      <header className="App-header">

      <Button 
      variant="contained"
      color="default"
      size="small"
      startIcon={<ExitToApp/>}
      onClick={logOut}>
        Logout
      </Button>

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
         
          <div style={{width: '100%'}}>
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
          </div>
          <div style={{marginTop: -100, display: 'flex', justifyContent: 'center', position: 'relative'}}>
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
      {predictionOut?
        <div>
        <div style={{border: "2px solid black", backgroundColor: "#780d24", paddingTop: "10px", marginTop: "10px"}}>
          <p>{String(Math.round((1 - distance)*100) + "% match")}</p>
          <p>{"Name: " + name}</p>
          {!privateProfile?
          <div>
          <p>Phone number: <a href={phoneRef}>{phone}</a></p>
          <p>Snapchat:  <a href={snapRef}>{snap}</a></p>
          <p>Instagram: <a href={instaRef}>{insta}</a></p>
          {!isFriend?
          <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => addFriend(uid) }
        >
          Add Friend
        </Button>:
        <p>Already Friends!</p>
      }
          </div>:
          <div style = {{marginBottom: 10}}>
          <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleSendRequest(uid) }
        >
          Request
        </Button>
        </div>
          }
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
        onClick={handleLeft}>
        <ArrowLeft style={{color: 'white'}}/>
        </IconButton>

        <p>{predictionIndexPrint + 1}</p>

        <IconButton
        onClick={handleRight}
        >
        <ArrowRight  style={{color: 'white'}}/>
        </IconButton>
        </div>
        </div>
        : 
        <div style = {{marginTop: "20px"}}>
        <p>{prediction}</p>
        </div>
      }
      <br/>
      </header>
    </div>

  );
    }


export default HomeScreen;