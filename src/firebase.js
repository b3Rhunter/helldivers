import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "helldivers-28e28.firebaseapp.com",
  projectId: "helldivers-28e28",
  storageBucket: "helldivers-28e28.appspot.com",
  messagingSenderId: "916606838054",
  appId: "1:916606838054:web:d2459dd8dd3920cdf3cde7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };