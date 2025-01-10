import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  onAuthStateChanged
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
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

document.getElementById("googleSignInBtn").addEventListener("click", () => {
  console.log("Sign-in button clicked");

  signInWithPopup(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

onAuthStateChanged(auth, user => {
  authButton = document.getElementById("googleSignInBtn");
  if (user) {
    authButton.textContent = "Signout";
    authButton.onClick = () => {
      logout();
    };
  } else {
    authButton.textContent = `<span class="btn-txt"> continue with google </span><i class="bi bi-google"></i>`;
  }
});

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("signout successfully");
    })
    .catch(error => {
      console.log("An error occured");
    });
};
