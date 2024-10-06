import ManageProducts from "./_pageComponents/ManageProducts";
import { db } from "@/firebase/clientApp";
import { getCategories } from "../addProductCategories/handler";
import React from "react";
export default async function ManageProductServer() {
  const categoryArray = await getCategories();
  return (
    <>
      <ManageProducts categoryArray={categoryArray}></ManageProducts>
    </>
  );
}


