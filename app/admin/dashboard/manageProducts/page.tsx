import ManageProducts from "./pageComponents/ManageProducts";
import { db } from "@/firebase/clientApp";
import { getCategories } from "../addProductCategories/handler";
export default async function ManageProductServer() {
  const categoryArray = await getCategories();
  return (
    <>
      <ManageProducts categoryArray={categoryArray}></ManageProducts>
    </>
  );
}

