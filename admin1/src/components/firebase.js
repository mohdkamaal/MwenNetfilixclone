import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCJzSRRZ62IBjTaXbEFMCm3fe8kyk4IQik",
  authDomain: "inshortcloneag.firebaseapp.com",
  projectId: "inshortcloneag",
  storageBucket: "inshortcloneag.appspot.com",
  messagingSenderId: "215652783530",
  appId: "1:215652783530:web:6a1b0d1a2f5ed8a99e47d3",
  measurementId: "G-88CD92QNV2",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
