import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDx45HbqMORU6eS6tmYPYZQ7xokY6YA1q4',
  authDomain: 'number-clicker.firebaseapp.com',
  projectId: 'number-clicker',
  storageBucket: 'number-clicker.appspot.com',
  messagingSenderId: '410005011430',
  appId: '1:410005011430:web:7c1d4a42f4f5455f19f427',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
