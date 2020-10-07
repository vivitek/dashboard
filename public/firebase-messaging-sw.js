importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyCyTA6w5ZmhDbChaL7u9pvWjTXfK6wu4No",
    authDomain: "vivi-7efef.firebaseapp.com",
    databaseURL: "https://vivi-7efef.firebaseio.com",
    projectId: "vivi-7efef",
    storageBucket: "vivi-7efef.appspot.com",
    messagingSenderId: "303932451830",
    appId: "1:303932451830:web:c9de53c92114378d7075d7",
    measurementId: "G-N1YBJ9S6MV"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();