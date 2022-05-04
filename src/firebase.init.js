// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpjP9Ez1_beGTQlcMYjbq61UWThCA2_yk",
  authDomain: "genius-car-services-44e1c.firebaseapp.com",
  projectId: "genius-car-services-44e1c",
  storageBucket: "genius-car-services-44e1c.appspot.com",
  messagingSenderId: "326922550722",
  appId: "1:326922550722:web:b3abdec8293dfe02696a5b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
