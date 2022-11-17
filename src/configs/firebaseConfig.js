import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import CONST from "../utils/constants";

const firebaseConfig = {
  apiKey: CONST.FIREBASE_KEY,
  authDomain: CONST.FIREBASE_AUTH_DOMAIN,
  projectId: CONST.FIREBASE_PROJECT_ID,
  storageBucket: CONST.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: CONST.FIREBASE_MESSAGING_SENDER_ID,
  appId: CONST.FIREBASE_APP_ID,
  measurementId: CONST.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)