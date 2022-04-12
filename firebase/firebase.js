// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhOjSX9C2LPwPE5PXrqMHhMIPLEX-E9es",
  authDomain: "themoviesdb-reactnativeapp.firebaseapp.com",
  projectId: "themoviesdb-reactnativeapp",
  storageBucket: "themoviesdb-reactnativeapp.appspot.com",
  messagingSenderId: "4595246900",
  appId: "1:4595246900:web:6b9e91d24020293fe5a761",
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
