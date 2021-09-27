import React, {useEffect, useContext, useState} from "react"

import {  Card } from "react-bootstrap"
import {signInWithGoogle} from '../firebase'
import { UserContext } from '../UserProvider';
import { Redirect } from "react-router-dom";
import google from './google.png'
import * as faceapi from 'face-api.js';
import icon from './icon192.png'
import hermione from './hermione.jpg';
import firebase from "firebase/app"
import "firebase/database"


export default function LoginScreen() {

  const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoaded2, setIsLoaded2] = useState(false)
  const [isLoaded3, setIsLoaded3] = useState(false)

  const [isRan, setIsRan] = useState(false)

  const load = async() => {
    checkForRequests();
    await loadModels();
    setredirect('/')
  }


  useEffect(() => {
    if (user != null && ("uid" in user) && user.uid != null) {
      setLoading(true)
      load();
    }
  }, [user])
  if (redirect) {
    return <Redirect to={redirect}/>
  }

  async function loadModels () {
    await faceapi.loadSsdMobilenetv1Model('/models');
    setIsLoaded(true)
    await faceapi.loadFaceLandmarkModel('/models');
    setIsLoaded2(true)

    await faceapi.loadFaceRecognitionModel('/models');
    setIsLoaded3(true)

    const input = document.getElementById('myImg')
    await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor()
    setIsRan(true)
  }

  const checkForRequests = () => {
    firebase.database().ref('Users/'  + user.uid + '/lastRequest').on("value", snapshot => {
      if (snapshot.exists()){
         var lastRequest = snapshot.val()
         if (lastRequest != null){
           var timeDiff = Date.now() - lastRequest
            if (timeDiff < 20000){
              var acceptance = window.confirm("A profile request was sent " + Math.round(timeDiff/1000) + " seconds ago. Do you want to accept?")
              if(acceptance === true){
                updateAcceptance();
              }
            }
           
         }
      }
   });
  }

  const updateAcceptance = () => {
    firebase.database().ref('Users/' + user.uid).update({
        latestAcceptance: Date.now()
		  },
		  (error) => {
				console.log(error);
		  } 
		  );
    
  }

  return (
  
    <div style={{color: 'white'}}>
      
    <div style={{textAlign: 'center'}}>
      {!isLoaded3?
      <div>
      <img src={icon} alt=""></img>
      </div>
      :null}
      {(loading && !isLoaded)?
          <div style={{textAlign: 'center'}}> 
          <p>Loading face detector model...</p>
          <p></p>
          <p></p>
          </div>: null
            }

        {(isLoaded && !isLoaded2)? 
          <div style={{textAlign: 'center'}}>
            <p>Successfully loaded face detector model.</p>
          <p>Loading facial landmark detection model...</p>
          <p></p>
          </div>: null
            }

        {(isLoaded && isLoaded2 && !isLoaded3)? 
          <div style={{textAlign: 'center'}}>
            <p>Successfully loaded face detector model.</p>
          <p>Successfully loaded facial landmark detection model.</p>
          <p>Loading face descriptor model...</p>
          </div>: null
            }
        </div>

        {(isLoaded3 && !isRan)?
        <div  style={{textAlign: 'center'}}>
        <p>Warming up facial recognition models with Hermione Granger...</p>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <img id='myImg' src={hermione} width="150" height="150"  alt=""></img>
        </div>
        </div>
        : null
        }

    {!loading?
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      </div>
      <Card style={{backgroundColor: '#A51C30'}}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{color: 'white'}}>FaceTag</h2>
          <div style = {{display: 'flex', justifyContent: 'center'}}>
        <input type="image" style={{width: '70%'}} onClick={signInWithGoogle} src={google} alt="Sign in with Google"/>
      </div>

        </Card.Body>
        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
        <p style={{color: 'white'}}>Sign in using your Harvard College email account.</p>
        </div>
      </Card>
    </div>: null
    }
    </div>

  )
}
