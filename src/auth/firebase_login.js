import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// 🔑 Firebase config (safe to keep here for client apps)
const firebaseConfig = {
  apiKey: "AIzaSyCddkukTgGAQFr-5IughLLyQ_7MlAe0KDo",
  authDomain: "quotenitone.firebaseapp.com",
  projectId: "quotenitone",
  storageBucket: "quotenitone.appspot.com",
  messagingSenderId: "392712693383",
  appId: "1:392712693383:web:3f0e2f3b1e4f3c4b5d6e7f"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 🔗 Sync user with backend REST API
async function syncWithBackend(email, plan = "basic") {
  try {
    await fetch("http://localhost:8000/api/users/sync/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, plan })
    });
    console.log("✅ Synced with backend:", email);
  } catch (err) {
    console.error("❌ Backend sync failed:", err);
  }
}

// ✅ Assign Basic Plan if new user
async function assignBasicPlan(user) {
  const ref = doc(db, "users", user.uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, {
      email: user.email,
      plan: "basic",
      startDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });
    console.log("🎉 Basic Plan assigned to", user.email);
  } else {
    // Update last login
    await updateDoc(ref, { lastLogin: new Date().toISOString() });
  }

  // Always sync with backend
  await syncWithBackend(user.email, "basic");
}

// 🌍 Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  // Google login
  document.querySelector(".google")?.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await assignBasicPlan(result.user);
      window.location.href = "home.html"; // ✅ same page for all
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  });

  // Facebook login
  document.querySelector(".facebook")?.addEventListener("click", async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await assignBasicPlan(result.user);
      window.location.href = "home.html"; // ✅ same page
    } catch (error) {
      alert("Facebook login failed: " + error.message);
    }
  });
    
    // Email login/signup → redirect to email.html
  document.querySelector(".email")?.addEventListener("click", () => {
    window.location.href = "email_login.html";
  });


    // personal login/signup → redirect to login_sign.html
  document.querySelector(".Personal")?.addEventListener("click", () => {
    window.location.href = "direct_login.html";
  });


  // Track login state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("✅ Logged in:", user.email);
      await assignBasicPlan(user); // updates last login
      window.location.href = "home.html"; // ✅ redirect logged-in users
    }
  });
});

// Close button → go back
document.getElementById("closeBtn")?.addEventListener("click", () => {
  if (document.referrer) {
    window.location.href = document.referrer;
  } else {
    window.location.href = "/";
  }
});
