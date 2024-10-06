import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXkf3opdyC1eNwBMpJARHHtD2KCczxCQI",
  authDomain: "inapp-share.firebaseapp.com",
  projectId: "inapp-share",
  storageBucket: "inapp-share.appspot.com",
  messagingSenderId: "874428586270",
  appId: "1:874428586270:web:3f9df39fcbee40e5b2510f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };