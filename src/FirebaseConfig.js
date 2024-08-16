import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCd7T1hsPGEajlRY3OghFS7InKTSrdXr0o",
    authDomain: "aniflix-a1e64.firebaseapp.com",
    projectId: "aniflix-a1e64",
    storageBucket: "aniflix-a1e64.appspot.com",
    messagingSenderId: "127963950001",
    appId: "1:127963950001:web:4182fa724f62ffa5a2ab90",
    measurementId: "G-NWJ6LECSMK"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);