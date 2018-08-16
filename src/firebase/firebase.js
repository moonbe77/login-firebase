// Initialize Firebase
import firebase from 'firebase/app';
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyAN8-Ys1YecwFp_1R7z_sOxcgokQYvutuU",
    authDomain: "login-test-134679.firebaseapp.com",
    databaseURL: "https://login-test-134679.firebaseio.com",
    projectId: "login-test-134679",
    storageBucket: "login-test-134679.appspot.com",
    messagingSenderId: "268078535176"
  };

  if (!firebase.apps.length){
      firebase.initializeApp(config);
    }

const auth = firebase.auth();
export { 
    auth,
    };