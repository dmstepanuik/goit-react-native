// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
import 'firebase/auth';
// import 'firebase/storage';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBbhSwiDpB_tgXg9EwHt3hpoBvXMm_dbjM',
  authDomain: 'goit-react-native-4550e.firebaseapp.com',
  projectId: 'goit-react-native-4550e',
  storageBucket: 'goit-react-native-4550e.appspot.com',
  messagingSenderId: '1081551999455',
  appId: '1:1081551999455:web:bb3cc75a79b6a54f4cf46a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
