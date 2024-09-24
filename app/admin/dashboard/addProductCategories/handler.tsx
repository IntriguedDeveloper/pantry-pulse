"use server";
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

export async function addCategory(categoryName: string) {
  const categoryRef = collection(db, "admin/categories/product-categories");
  await addDoc(categoryRef, { name: categoryName });
}
export async function getCategories(): Promise<String[]> {
  const querySnapshot = await getDocs(
    collection(db, "admin", "categories", "product-categories")
  );
  const fetchedCategories: string[] = [];
  querySnapshot.forEach((doc) => {
    fetchedCategories.push(doc.data().name);
  });
  return fetchedCategories;
}
export async function deleteCategory(categoryName: string) {
  const q = query(
    collection(db, "admin/categories/product-categories"),
    where("name", "==", categoryName)
  );
  const querySnapshot = await getDocs(q);
  let docID: string = "";
  querySnapshot.forEach((doc) => {
    docID = doc.id;
  });

  deleteDoc(doc(db, "admin/categories/product-categories", docID));
}
