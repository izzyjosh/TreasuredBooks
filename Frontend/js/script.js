import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6iDrrxLkO-EIDFhnecfHVGVFQC-6L7bg",
  authDomain: "bookstore-2f7ae.firebaseapp.com",
  projectId: "bookstore-2f7ae",
  storageBucket: "bookstore-2f7ae.firebasestorage.app",
  messagingSenderId: "507591477950",
  appId: "1:507591477950:web:bb4b75334274c1100a2cef",
  measurementId: "G-3S44TVNN7Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();

const authButton = document.getElementById("googleSignInBtn");
const logoutBtn = document.getElementById("googleSignOutBtn");

logoutBtn.style.display = "none";

authButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

onAuthStateChanged(auth, user => {
  if (user) {
    logoutBtn.style.display = "block";
    authButton.style.display = "none";

    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("signout successfully");
        })
        .catch(error => {
          alert("An error occured");
        });
    });
  } else {
    // User is signed out
    logoutBtn.style.display = "none";
    authButton.style.display = "block";
  }
});
