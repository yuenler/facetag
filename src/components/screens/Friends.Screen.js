import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app"
import "firebase/database"

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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
var numFriendOfFriends = [];

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
   });
  }

  const retrieveFriendData = () => {
    if (user && user.uid) { 
    setNumFriends(numFriendsVar);
    firebase.database().ref('Users/' + user.uid + '/Friends').on('child_added', (snapshot) => {
      if (snapshot.exists()){
          var uid = snapshot.val().uid  
          getProfile(uid)
      }
    });
  }
  }

  const determineNumFriends = (snapshot) => {
    if (snapshot != null){
    return Object.keys(snapshot).length
    }
    else{
      return 0
    }
  }
    
  const getProfile = (uid) => {
    firebase.database().ref('Users/' + uid).once('value', (snapshot) => {
      if (!uids.includes(uid)){
        uids.push(uid);
        names.push(snapshot.val().name);
        phones.push(snapshot.val().phone);
        snaps.push(snapshot.val().snap);
        instas.push(snapshot.val().insta);

        let numFriendOfFriend = determineNumFriends(snapshot.val().Friends)
        numFriendOfFriends.push(numFriendOfFriend)


        setPredictionIndex(0);
        numFriendsVar = uids.length
        setNumFriends(uids.length);
      }

    })
  }

  const removeFriendFromLists = (currentUid) => {
    const index = uids.indexOf(currentUid);
    if (index > -1) {
      numFriendsVar = uids.length-1
      setNumFriends(uids.length-1);
      uids.splice(index, 1);
      phones.splice(index, 1);
      snaps.splice(index, 1);
      instas.splice(index, 1);
      names.splice(index, 1);
      numFriendOfFriends.splice(index, 1);
      setPredictionIndex(0);
    }
  }

  const removeFriend = (currentUid) => {
    removeFriendFromLists(currentUid);
    var confirmation = window.confirm("Are you sure you want to remove this friend? You will need to scan their face again in order to re-add them.")
    if(confirmation === true){
      var ref = firebase.database().ref('Users/' + user.uid + '/Friends');
      ref.orderByChild('uid').equalTo(currentUid)
          .once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
              ref.child(childSnapshot.key).remove();
          }
          );
      });

      var ref2 = firebase.database().ref('Users/' + currentUid + '/Friends');
      ref2.orderByChild('uid').equalTo(user.uid)
          .once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
              ref2.child(childSnapshot.key).remove();
          });
      });
    }
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
    retrieveFriendData();
  })

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
    <div style={{margin: 0, height: '100vh',  padding: 10, color: "white" }}>
      
      <IconButton onClick={() => { handleHome() }}>
        <ArrowBack style={{color: 'white'}}/>
      </IconButton>
      <p>Number of friends: {numFriends}</p>
      <div style={{height: '50vh',overflowY: 'scroll'}}>
      {Array(numFriends).fill(1).map((x, y) => x + y).map(index => (

          <div key={index} style={{backgroundColor: predictionIndex === index-1? '#780d24': 'black'}}>
            <ListItem  disablePadding>
            <ListItemButton onClick={() => setPredictionIndex(index-1)}>
              <ListItemText primary={names[index-1]} />
            </ListItemButton>
            </ListItem>
            <hr style={{margin: 0, padding: 0}}></hr>
            </div>
          
          ))}
        </div>
        
        {numFriends !== 0?
        <div style={{ bottom: 0, textAlign: 'center'}}>
        
        <div style={{border: "2px solid black", backgroundColor: "#780d24", paddingTop: "10px", marginTop: "10px", paddingLeft: 20, paddingRight: 20}}>
        <div style={{display: 'flex', position: 'relative', height: 20}}>
        <div style={{position: 'absolute', right: -20, top: -20}}>
        <IconButton aria-label="clear" onClick={() => {removeFriend(uids[predictionIndex])}}>
        <RemoveCircle style={{color: 'white'}}/>
      </IconButton>
          </div>
          </div>
        <div style={{display: 'flex', position: 'relative'}}>
                  <p><b>{names[predictionIndex]}</b></p>
                  <div style={{position: "absolute", right: 0}}>
                    <p>{numFriendOfFriends[predictionIndex] + " friends"}</p>
                  </div>
                </div>
        
          <div>
          <p>Phone number: <a href={phoneRef}>{phones[predictionIndex]}</a></p>
          <p>Snapchat:  <a href={snapRef}>{snaps[predictionIndex]}</a></p>
          <p>Instagram: <a href={instaRef}>{instas[predictionIndex]}</a></p>
          
          </div>
          
          
        </div>
        </div>: null
        }

      <br/>
    </div>

  );
    }


export default FriendsScreen;