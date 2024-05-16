// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import * as firebaseData from '../consts/CredencialesFirebaseAuthentication'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseData.FIREBASE_API_KEY,
  authDomain: firebaseData.FIREBASE_AUTH_DOMAIN,
  projectId: firebaseData.FIREBASE_PROJECT_ID,
  storageBucket: firebaseData.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseData.FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseData.FIREBASE_APP_ID,
  measurementId: firebaseData.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
