// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdbl9d34M_AIwE83k-2xEAnw_DLQhYm4U",
  authDomain: "vac-ass.firebaseapp.com",
  projectId: "vac-ass",
  storageBucket: "vac-ass.appspot.com",
  messagingSenderId: "161511658313",
  appId: "1:161511658313:web:a3ffe1c54c72e97a84c098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
