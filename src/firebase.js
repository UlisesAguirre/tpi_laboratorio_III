
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxRB7CmxoHg0VDc0OGAwGxPTAEghqtyr4",
  authDomain: "db-reservation-system.firebaseapp.com",
  projectId: "db-reservation-system",
  storageBucket: "db-reservation-system.appspot.com",
  messagingSenderId: "512836247348",
  appId: "1:512836247348:web:5eed85e826e4bdbf158f61"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

