"use client";
import React, { useState } from "react";
import { useEffect } from "react";

import { getProductsInCategory } from "../handler";
import styles from "./DropDownStyles.module.css";
import useSWR from "swr";
import ProductFragment from "./ProductFragment";
import { ProductDetails } from "../../addProduct/ClientComponent";
type DropDownProductComponentTypes = {
  categoryName: string;
};

export default function DropDownProductComponent({
  categoryName,
}: DropDownProductComponentTypes) {
  const categoryArrayFetcher = async () => {
    const categoryArray = await getProductsInCategory(categoryName);
    return categoryArray;
  };

  const { data, error } = useSWR(
    categoryName ? `products-${categoryName}` : null,
    categoryArrayFetcher
  );
  return (
    <>
      <div className={styles.dropDownContainer}>
        <div className={styles.titleContainer}></div>
        <div className={styles.listContainer}>
          {data && data.length > 0
            ? data.map((product: ProductDetails, index: number) => (
                <ProductFragment
                  productName={product.productName}
                  brandName={product.brandName}
                  stockQuantity={product.stockQuantity}
                  productImage={product.productImage}
                  key={index}
                ></ProductFragment>
              ))
            : "No data found"}
        </div>
      </div>
    </>
  );
}
