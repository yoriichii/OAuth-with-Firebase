import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/route'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgY0C-Ex6lFVAZ4-5MOVtkmYu3VQ5RO1I",
  authDomain: "login-e4730.firebaseapp.com",
  projectId: "login-e4730",
  storageBucket: "login-e4730.firebasestorage.app",
  messagingSenderId: "871038489222",
  appId: "1:871038489222:web:8b579ba93497c9f3403707",
  measurementId: "G-92BGZMJ2ZY"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)
app.mount('#app')
