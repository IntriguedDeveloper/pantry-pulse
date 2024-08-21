import { db } from "@/firebase/clientApp";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore";

export async function addCategory(categoryName) {
  const categoryRef = collection(db, "admin/categories/product-categories");
  await addDoc(categoryRef, { name: categoryName });
}
export async function getCategories() {
  const querySnapshot = await getDocs(
    collection(db, "admin", "categories", "product-categories")
  );
  const fetchedCategories = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data().name);
    fetchedCategories.push(doc.data().name)
  });
  return fetchedCategories;
}
