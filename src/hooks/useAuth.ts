import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

const API_BASE = "http://127.0.0.1:8000"; // change when deployed

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    authToken: localStorage.getItem("authToken")
  });

  const setAuth = (token: string, username: string, plan: string) => {
    const user: User = { username, plan, authToken: token };
    
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    
    setAuthState({
      isAuthenticated: true,
      user,
      authToken: token
    });
  };

  const clearAuth = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      authToken: null
    });
  };

  const logout = async () => {
    if (authState.authToken) {
      try {
        await fetch(`${API_BASE}/logout/`, {
          method: "POST",
          headers: { Authorization: `Token ${authState.authToken}` },
        });
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    clearAuth();
    window.location.href = "/";
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    
    if (token && username) {
      try {
        const res = await fetch(`${API_BASE}/api/get-user-plan/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        const data = await res.json();
        setAuth(token, username, data.plan);
      } catch (err) {
        console.error("Auth check failed", err);
        clearAuth();
      }
    } else {
      clearAuth();
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    authState,
    setAuth,
    clearAuth,
    logout,
    checkAuthStatus
  };
};