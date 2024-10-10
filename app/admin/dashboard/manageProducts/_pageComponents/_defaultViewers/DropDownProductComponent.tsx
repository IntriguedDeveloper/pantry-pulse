"use client";
import React, { useState } from "react";
import { useEffect } from "react";

import styles from "./DropDownStyles.module.css";
import useSWR from "swr";
import ProductFragment from "./ProductFragment";
import { ProductDetails } from "../../../addProduct/ClientComponent";
type DropDownProductComponentTypes = {
  data: any;
  slicedArray: any;
};

export default function DropDownProductComponent({
  data,
  slicedArray,
}: DropDownProductComponentTypes) {
  return (
    <>
      <div className={styles.dropDownContainer}>
        <div className={styles.titleContainer}>Slaves</div>
        <div className={styles.listContainer}>
          {data && data.length > 0
            ? data.map((product: ProductDetails, index: number) => (
                <ProductFragment
                  productImage={product.productImage}
                  productName={product.productName}
                  brandName={product.brandName}
                  stockQuantity={product.stockQuantity}
                  key={index}
                ></ProductFragment>
              ))
            : "Loading..."}
        </div>
      </div>
    </>
  );
}
