import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyC84FD4g78rZCDO29F18S_oM1GVyzrJN7g",
  authDomain: "pantrypulse-27c70.firebaseapp.com",
  projectId: "pantrypulse-27c70",
  storageBucket: "gs://pantrypulse-27c70.appspot.com",
  messagingSenderId: "253402690548",
  appId: "1:253402690548:web:b7678f1138ad24801affa1",
  measurementId: "G-QY3HSJ2ZS7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;