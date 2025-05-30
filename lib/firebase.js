import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sewwall-ef705.firebaseapp.com",
  projectId: "sewwall-ef705",
  storageBucket: "sewwall-ef705.appspot.com",
  messagingSenderId: "886460142524",
  appId: "1:886460142524:web:5bafdd329bd6dff1a7d1b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };
