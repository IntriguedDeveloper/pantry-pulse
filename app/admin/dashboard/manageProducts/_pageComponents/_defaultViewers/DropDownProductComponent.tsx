"use client";
import React from "react";
import styles from "./DropDownStyles.module.css";
import ProductFragment from "./ProductFragment";
import { ProductDetails } from "../../../addProduct/ClientComponent";

type DropDownProductComponentTypes = {
  data: ProductDetails[];
  slicedArray: ProductDetails[];
};

export default function DropDownProductComponent({
  data,
  slicedArray,
}: DropDownProductComponentTypes) {
  return (
    <>
      <div className={styles.dropDownContainer}>
        {slicedArray.map(
          (deDuplicatedObject: ProductDetails, index: number) => (
            <div className={styles.rowContainer}>
              <IndividualCategoryRow
                key={index}
                categoryName={deDuplicatedObject.selectedCategory}
                data={data.filter(
                  (product) =>
                    product.selectedCategory ===
                    deDuplicatedObject.selectedCategory
                )}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}

type IndividualCategoryRowProps = {
  categoryName: string;
  data: ProductDetails[];
};

function IndividualCategoryRow({
  categoryName,
  data,
}: IndividualCategoryRowProps) {
  return (
    <>
      <div className={styles.titleContainer}>{categoryName}</div>
      <div className={styles.listContainer}>
        {data && data.length > 0 ? (
          data.map((product: ProductDetails, index: number) => (
            <ProductFragment
              key={index}
              productImage={product.productImage}
              productName={product.productName}
              brandName={product.brandName}
              stockQuantity={product.stockQuantity}
            />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </>
  );
}
