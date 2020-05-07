import firebase from "firebase";
import "@firebase/firestore";
import "@firebase/storage";

export const cargarConfiguracion = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCJMH6VYbxs3BIwSaV2SSfEIgNZe5X935Y",
        authDomain: "reactnative-a818c.firebaseapp.com",
        databaseURL: "https://reactnative-a818c.firebaseio.com",
        projectId: "reactnative-a818c",
        storageBucket: "reactnative-a818c.appspot.com",
        messagingSenderId: "860816174217",
        appId: "1:860816174217:web:680ab21eda0cdfcc842a58"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig); //Deja inicializado y se puede acceder en cualquer lado
    global.firestoredb = firebase.firestore(); //Inicializa la BDD y se puede acceder a los metodos de la base, se debe almacenar en una variable global para tener accceso desde cualqueir archivo
    global.estaConfigurado = true;
    global.storage = firebase.storage(); //Para almacenar en es storage las imagenes
}