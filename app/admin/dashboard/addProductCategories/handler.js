import { db } from "@/firebase/clientApp";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  getDoc,
  where,
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
    fetchedCategories.push(doc.data().name);
  });
  return fetchedCategories;
}
export async function deleteCategory(categoryName) {
  const q = query(
    collection(db, "admin/categories/product-categories"),
    where("name", "==", categoryName)
  );
  const querySnapshot = await getDocs(q);
  let docID;
  querySnapshot.forEach((doc) => {
    docID = doc.id;
  });

  deleteDoc(doc(db, "admin/categories/product-categories", docID));
}
