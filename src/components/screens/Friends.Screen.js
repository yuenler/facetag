import React, { useRef, useEffect, useState, useContext, useReducer } from "react";
import firebase from "firebase/app"
import "firebase/database"

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';



import { logOut } from "../../firebase";
import { UserContext } from "../../UserProvider";
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

var phones = [];
var snaps = [];
var instas = [];
var uids = [];
var names = [];
var numFriendsVar = 0;

function FriendsScreen() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);


  const history = useHistory()
  const classes = useStyles()

  const [numFriends, setNumFriends] = useState(0);
  const [predictionIndex, setPredictionIndex] = useState(0);  

  const phoneRef = "sms:" + phones[predictionIndex];
  const instaRef = "instagram://user?username=" + instas[predictionIndex];
  const snapRef = "snapchat://add/" + snaps[predictionIndex];


  function handleHome() {
    history.push("/")
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
    setNumFriends(numFriendsVar);
    firebase.database().ref('Users/' + user.uid + '/Friends').on('child_added', (snapshot) => {
      var uid = snapshot.val().uid  
      if (!uids.includes(uid)){
          getProfile(uid)
        }
    });
  }

    
  const getProfile = (uid) => {
    firebase.database().ref('Users/' + uid).once('value', (snapshot) => {
        uids.push(uid);
        names.push(snapshot.val().name);
        phones.push(snapshot.val().phone);
        snaps.push(snapshot.val().snap);
        instas.push(snapshot.val().insta);
        setPredictionIndex(0);
        numFriendsVar = uids.length
        setNumFriends(uids.length);
    })
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
    <div className="App" style={{margin: 0, padding: 0, color: "white" }}>
      <header className="App-header">

      <IconButton onClick={() => { handleHome() }}>
        <ArrowBack style={{color: 'white'}}/>
      </IconButton>

      <p>Number of friends: {numFriends}</p>
      {Array(numFriends).fill(1).map((x, y) => x + y).map(index => (
          //   <ListItemButton key={index} component="a" onClick={() => setPredictionIndex(index-1)}> 
          //   <ListItemText primary={names[index-1]} />
          // </ListItemButton>
          <div style={{backgroundColor: predictionIndex === index-1? '#780d24': 'black'}}>
            <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setPredictionIndex(index-1)}>
              <ListItemText primary={names[index-1]} />
            </ListItemButton>
            </ListItem>
            <hr style={{margin: 0, padding: 0}}></hr>
            </div>
          
          ))}

        <div style={{textAlign: 'center'}}>
        <div style={{border: "2px solid black", backgroundColor: "#780d24", paddingTop: "10px", marginTop: "10px"}}>
          <p>{"Name: " + names[predictionIndex]}</p>
          <div>
          <p>Phone number: <a href={phoneRef}>{phones[predictionIndex]}</a></p>
          <p>Snapchat:  <a href={snapRef}>{snaps[predictionIndex]}</a></p>
          <p>Instagram: <a href={instaRef}>{instas[predictionIndex]}</a></p>
          
          </div>
          
          
        </div>
        </div>

      <br/>
      </header>
    </div>

  );
    }


export default FriendsScreen;