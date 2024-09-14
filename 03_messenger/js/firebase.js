import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, update, get, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8WS0Eub5_uIcrx0CsFI9DAG85fMq9SfA",
    authDomain: "bootcamp-messenger.firebaseapp.com",
    databaseURL: "https://bootcamp-messenger-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bootcamp-messenger",
    storageBucket: "bootcamp-messenger.appspot.com",
    messagingSenderId: "1057933712517",
    appId: "1:1057933712517:web:32e3e4bbbc6443d3e4ddec",
    measurementId: "G-LYFV0XR035"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db, ref, update, get, onValue, push, set };
