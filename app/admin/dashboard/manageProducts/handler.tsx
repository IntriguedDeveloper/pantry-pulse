import {
  getDoc,
  getDocs,
  where,
  query,
  collection,
  QuerySnapshot,
} from "firebase/firestore";
import { db, storage } from "@/firebase/clientApp";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { ProductDetails } from "../addProduct/ClientComponent";
export async function getProductsInCategory(productCategoryName: string) {
  let productArray: ProductDetails[] = [];
  const categoryRef = "admin/product-doc/products";

  const q = query(
    collection(db, "admin/product-doc/products"),
    where("selectedCategory", "==", productCategoryName)
  );
  let querySnapShot = await getDocs(q);

  for (const doc of querySnapShot.docs) {
    const productImage = await getProductImage(
      doc.id,
      doc.data().selectedCategory
    );
    
    const documentObj: ProductDetails = {
      ...doc.data(),
      productImage: productImage, 
    } as ProductDetails;

    productArray.push(documentObj);
  }
  console.log(productArray);
  return productArray;
}
export async function getProductImage(
  productDocID: string,
  productCategoryName: string
) {
  console.log(`products/${productCategoryName}/${productDocID}/0`);
  try {
    const imageURL = await getDownloadURL(
      ref(storage, `products/${productCategoryName}/${productDocID}/0`)
    );
    return imageURL;
  } catch (error: any) {
    switch (error.code) {
      case "storage/object-not-found":
        console.log("File doesn't exist");
        break;
      case "storage/unauthorized":
        console.log("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.log("User canceled the upload");
        break;
      case "storage/unknown":
        console.log("Unknown error occurred");
        break;
      default:
        console.log("An unexpected error occurred");
    }
    return null;
  }
}
