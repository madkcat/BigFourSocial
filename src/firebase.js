import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDx0S6coO8p7HiPIuw43Z0YhwwKJoJ3Ez4",
    authDomain: "cireaction.firebaseapp.com",
    databaseURL: "https://cireaction.firebaseio.com",
    projectId: "cireaction",
    storageBucket: "cireaction.appspot.com",
    messagingSenderId: "1020339164642"
  };

firebase.initializeApp(config);



export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;