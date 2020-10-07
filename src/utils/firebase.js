import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCyTA6w5ZmhDbChaL7u9pvWjTXfK6wu4No",
    authDomain: "vivi-7efef.firebaseapp.com",
    databaseURL: "https://vivi-7efef.firebaseio.com",
    projectId: "vivi-7efef",
    storageBucket: "vivi-7efef.appspot.com",
    messagingSenderId: "303932451830",
    appId: "1:303932451830:web:c9de53c92114378d7075d7",
    measurementId: "G-N1YBJ9S6MV"
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.getToken({vapidKey:"BN5aisXMcXa5sL9Qk6euOT91UeYoAs4Ep2vNf9lWXTCEx368YbC5sc5r2AGiAnh2NDCR0iwCrtSHMezRSTILdQQ"})

export default firebase
export {messaging}