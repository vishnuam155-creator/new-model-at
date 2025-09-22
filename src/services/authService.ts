import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const API_BASE = "http://127.0.0.1:8000";

// Sync user with backend
export const syncWithBackend = async (email: string, plan: string = "basic") => {
  try {
    const response = await fetch(`${API_BASE}/api/users/sync/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, plan }),
      credentials: "include"
    });
    
    if (response.ok) {
      console.log("✅ Synced with backend:", email);
    } else {
      console.error("❌ Backend sync failed:", response.status);
    }
  } catch (err) {
    console.error("❌ Backend sync error:", err);
  }
};

// Assign basic plan to new users
export const assignBasicPlan = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // New user - assign basic plan
    await setDoc(userRef, {
      email: user.email,
      plan: "basic",
      startDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });
    console.log("🎉 Basic Plan assigned to", user.email);
  } else {
    // Existing user - update last login
    await updateDoc(userRef, { 
      lastLogin: new Date().toISOString() 
    });
  }

  // Always sync with backend
  await syncWithBackend(user.email!, "basic");
};

// Google Sign In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await assignBasicPlan(result.user);
    return result.user;
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};

// Facebook Sign In
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await assignBasicPlan(result.user);
    return result.user;
  } catch (error) {
    console.error("Facebook sign in error:", error);
    throw error;
  }
};

// Email Sign Up
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await assignBasicPlan(result.user);
    return result.user;
  } catch (error) {
    console.error("Email sign up error:", error);
    throw error;
  }
};

// Email Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await assignBasicPlan(result.user); // Update last login
    return result.user;
  } catch (error) {
    console.error("Email sign in error:", error);
    throw error;
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("✅ User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};