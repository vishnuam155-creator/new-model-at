import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { signOutUser } from '../services/authService';

interface FirebaseAuthState {
  user: User | null;
  plan: string;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useFirebaseAuth = () => {
  const [authState, setAuthState] = useState<FirebaseAuthState>({
    user: null,
    plan: 'guest',
    isLoading: true,
    isAuthenticated: false
  });

  const logout = async () => {
    try {
      await signOutUser();
      // Auth state will be updated by onAuthStateChanged
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserPlan = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data().plan || 'basic';
      }
      return 'basic';
    } catch (error) {
      console.error('Error getting user plan:', error);
      return 'basic';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const plan = await getUserPlan(user);
        setAuthState({
          user,
          plan,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setAuthState({
          user: null,
          plan: 'guest',
          isLoading: false,
          isAuthenticated: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    authState,
    logout
  };
};