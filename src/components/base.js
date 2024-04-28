// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsxoZe7UPyGWMzpswzn9W5G8h5i3nnJVo",
  authDomain: "react-todo-b62a1.firebaseapp.com",
  projectId: "react-todo-b62a1",
  storageBucket: "react-todo-b62a1.appspot.com",
  messagingSenderId: "858144719454",
  appId: "1:858144719454:web:33f3ce5a364257e2d0aacf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//Below we export the auth object so we can use it elsewhere in our project (AuthContext)
export { auth }