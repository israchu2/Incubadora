
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCs1jzfi12_RF9-NWqxTr48nroPFzZjWGI",
    authDomain: "automatizacionincubadora.firebaseapp.com",
    databaseURL: "https://automatizacionincubadora-default-rtdb.firebaseio.com",
    projectId: "automatizacionincubadora",
    storageBucket: "automatizacionincubadora.appspot.com",
    messagingSenderId: "1034522230583",
    appId: "1:1034522230583:web:d682dbf1ca27351f4da4b2",
    measurementId: "G-LHV83T4Y2Z"
};

export const fire = firebase.initializeApp(firebaseConfig);