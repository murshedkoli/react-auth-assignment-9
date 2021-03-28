import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDimGZ8WzneziMLXnZwLhx8eNsc2IU9ux0",
    authDomain: "react-sign-in-m.firebaseapp.com",
    projectId: "react-sign-in-m",
    storageBucket: "react-sign-in-m.appspot.com",
    messagingSenderId: "1052825215922",
    appId: "1:1052825215922:web:1b8a05d66a9d351a837aab"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}



export const handLoginWithEmail = (email, password, name) => {


    if (email, password, name) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    }





    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            return user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}