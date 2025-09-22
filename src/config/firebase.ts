import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCddkukTgGAQFr-5IughLLyQ_7MlAe0KDo",
  authDomain: "quotenitone.firebaseapp.com",
  projectId: "quotenitone",
  storageBucket: "quotenitone.appspot.com",
  messagingSenderId: "392712693383",
  appId: "1:392712693383:web:3f0e2f3b1e4f3c4b5d6e7f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;