import app from "./firebase-config.js";
import { addBook, fetchBooks, fetchCategories } from "./utils.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const auth = getAuth();

const provider = new GoogleAuthProvider();

const categoryDisplay = async () => {
  const categories = await fetchCategories();
  const categoriesContainer = document.querySelector(".cards");
  
  categories.forEach(category => {
    const categoryHTML = `<div class="card">
            <img src="${category.image}" alt="Education image" />
            <h5>${category.name}</h5>
            <p>
              ${category.description}
            </p>
          </div>`;

    categoriesContainer.innerHTML += categoryHTML;
  });
};
categoryDisplay();

// Example: Fetching and displaying books
const bookDisplay = async () => {
  const books = await fetchBooks();
  const latestBooks = books.slice(0, 10);
  const bookContainer = document.querySelector(".cards-wrapper");

  latestBooks.forEach(book => {
    const bookHTML = `<div class="card">
              <img src="${book.image}" alt="Book 1" />
              <p class="title">${book.title}</p>
              <p class="author">${book.author}</p>
              <p class="price">$${book.price}</p>
            </div>
      
    `;
    bookContainer.innerHTML += bookHTML;
  });
};
await bookDisplay();

const authButton = document.getElementById("googleSignInBtn");
const logoutBtn = document.getElementById("googleSignOutBtn");

authButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// Auth concerning user
onAuthStateChanged(auth, user => {
  if (user) {
    console.log(user);
    // set user image
    const userImage = document.getElementById("userImage");
    userImage.setAttribute("src", user.photoURL);

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
