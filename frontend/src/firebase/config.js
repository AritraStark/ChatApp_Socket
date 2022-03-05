import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBD-EhlYM26jcmp4iyWbsRPFyiji-JMqyA",
    authDomain: "socket-chat-aac54.firebaseapp.com",
    projectId: "socket-chat-aac54",
    storageBucket: "socket-chat-aac54.appspot.com",
    messagingSenderId: "564106357117",
    appId: "1:564106357117:web:ee973af5f1b6f672918414"
  };
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();
export { fireStore };