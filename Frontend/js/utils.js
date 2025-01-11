import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import app from "./firebase-config.js";

const db = getFirestore(app);

// Function to add a book

export async function addBook(book) {
  try {
    await addDoc(collection(db, "Books"), {
      ...book,
      createdAt: serverTimestamp()
    });
    console.log("Book added successfully!");
  } catch (error) {
    console.error("Error adding book: ", error);
  }
}

export async function fetchCategories() {
  const categories = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    querySnapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.dta() });
    });
    return categories;
  } catch {
    console.error("Error fetching categories: ", error);
    return [];
  }
}
// Function to fetch books
export async function fetchBooks() {
  const books = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Books"));
    querySnapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
  } catch (error) {
    console.error("Error fetching books: ", error);
    return [];
  }
}
