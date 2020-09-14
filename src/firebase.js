import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBq2lqoUMDNP01NnIfOuZWf-Jp7sFydzvA",
  authDomain: "snake-ede56.firebaseapp.com",
  databaseURL: "https://snake-ede56.firebaseio.com",
  projectId: "snake-ede56",
  storageBucket: "snake-ede56.appspot.com",
  messagingSenderId: "750114326004",
  appId: "1:750114326004:web:980863df23d2b65700e5a1",
  measurementId: "G-LXSF6QJPRH",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
