"use client";
import React, { useState } from "react";
import { useEffect } from "react";

import styles from "./DropDownStyles.module.css";
import useSWR from "swr";
import ProductFragment from "./ProductFragment";
import { ProductDetails } from "../../../addProduct/ClientComponent";
type DropDownProductComponentTypes = {
  data: any;
};

export default function DropDownProductComponent({
  data,
}: DropDownProductComponentTypes) {
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
            : "Loading..."}
        </div>
      </div>
    </>
  );
}
