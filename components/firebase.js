import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-jSo6_l9GEYIraWykBkKpqRaujxYyd4Q",
  authDomain: "unnamed-c7439.firebaseapp.com",
  projectId: "unnamed-c7439",
  storageBucket: "unnamed-c7439.appspot.com",
  messagingSenderId: "549840475287",
  appId: "1:549840475287:web:f992512e9c514f8fd545d2",
  measurementId: "G-ZD5J069LNJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const database = getDatabase(app);