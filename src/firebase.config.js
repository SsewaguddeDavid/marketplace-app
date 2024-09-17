import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuN5Ab1nLktMEBRJYgvvEORN8h30ClPIs",
  authDomain: "marketplace-app-66ab0.firebaseapp.com",
  projectId: "marketplace-app-66ab0",
  storageBucket: "marketplace-app-66ab0.appspot.com",
  messagingSenderId: "1062169059575",
  appId: "1:1062169059575:web:75d7c5b47818853a1073f2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
