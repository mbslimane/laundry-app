import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyC1aYkOgo_jzHdmsg6T7C8kutgV8RlXbCE",
  authDomain: "laundry-app-ecb30.firebaseapp.com",
  projectId: "laundry-app-ecb30",
  storageBucket: "laundry-app-ecb30.appspot.com",
  messagingSenderId: "968475627023",
  appId: "1:968475627023:web:810002f6b42d0900e25d7a",
  measurementId: "G-M2RRDELPH0",
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore();
export {auth, db} 