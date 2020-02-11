/*****************************************************************
**  Description: Firebase database and storage configuration file
*****************************************************************/

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; 
import 'firebase/storage';
import firebase_credential from './credentials.js'; 

const config = {
    apiKey: firebase_credential,
    authDomain: "cireaction.firebaseapp.com",
    databaseURL: "https://cireaction.firebaseio.com",
    projectId: "cireaction",
    storageBucket: "cireaction.appspot.com",
    messagingSenderId: "1020339164642"
  };

  firebase.initializeApp(config);
  
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;