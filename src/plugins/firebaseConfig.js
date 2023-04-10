import firebase from "firebase/compat";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm7B1Tv3KrmCDyhngH7UNa4J5QyiejRac",
  authDomain: "studentmanager-28874.firebaseapp.com",
  projectId: "studentmanager-28874",
  storageBucket: "studentmanager-28874.appspot.com",
  messagingSenderId: "414731397409",
  appId: "1:414731397409:web:2d6a4a95ca782cbcda7660",
  measurementId: "G-GFPL424QJ4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore;
