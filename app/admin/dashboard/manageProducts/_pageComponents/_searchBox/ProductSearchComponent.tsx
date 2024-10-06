"use client";
import React, { useState } from "react";
import styles from "./ProductSearch.module.css";
import Image from "next/image";
import { ProductDetails } from "../../../addProduct/ClientComponent";
import crossIcon from "@/public/common/crossIcon.svg";

export default function ProductSearchComponent({
  categoryList,
  handleSearchToggle,
}: {
  categoryList: ProductDetails[];
  handleSearchToggle: () => void;
}) {
  const [categorySearchState, setSearchState] = useState(true);
  const [isCrossClicked, setIsCrossClicked] = useState(false);
  const slicedArray = removeDuplicateCategories(categoryList);
  const handleCrossClick = () => {
    setIsCrossClicked(!isCrossClicked);
    handleSearchToggle();
  };
  const categoryClicked = (selectedCategory: string) => {
    setSearchState(!categorySearchState);
  };
  return (
    <>
      {!isCrossClicked && (
        <div className={styles.container}>
          <Image
            src={crossIcon}
            alt="crossIcon"
            className={styles.crossIcon}
            onClick={handleCrossClick}
          ></Image>
          <input
            type="text"
            className={styles.searchBox}
            placeholder={
              categorySearchState
                ? "Search for product categories"
                : "Search for products"
            }
          ></input>
          <div className={styles.cardContainer}>
            {categorySearchState
              ? slicedArray.map((product: ProductDetails, index: number) => (
                  <CategoryInfoCard
                    categoryName={product.selectedCategory}
                    categoryImageURL={product.productImage}
                    clickCallback={categoryClicked}
                    key={index}
                  ></CategoryInfoCard>
                ))
              : categoryList.map((product: ProductDetails, index: number) => (
                  <ProductInfoCard
                    productName={product.productName}
                    brandName={product.brandName}
                    stockQuantity={product.stockQuantity}
                    imageURL={product.productImage}
                    key={index}
                  ></ProductInfoCard>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
function ProductInfoCard({
  productName,
  brandName,
  stockQuantity,
  imageURL,
}: {
  productName: string;
  brandName: string;
  stockQuantity: number;
  imageURL: string;
}) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={imageURL}
          height={100}
          width={100}
          alt="Product Image"
        ></Image>
      </div>
      <div className={styles.productDetailsContainer}>
        <a>{productName}</a>
        <a>{brandName}</a>
        <a>{stockQuantity}</a>
      </div>
    </div>
  );
}
function CategoryInfoCard({
  categoryName,
  categoryImageURL,
  clickCallback,
}: {
  categoryName: string;
  categoryImageURL: string;
  clickCallback: Function;
}) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <Image
          onClick={() => {
            clickCallback(categoryName);
          }}
          src={categoryImageURL}
          alt="Category Image"
          height={150}
          width={170}
        ></Image>
      </div>
      <div className={styles.categoryNameContainer}>
        <a>{categoryName}</a>
      </div>
    </div>
  );
}
function removeDuplicateCategories(list: ProductDetails[]): ProductDetails[] {
  let newArr = [];
  const n = list.length;
  if (n == 0 || n == 1) {
    return list;
  }
  for (let i = 0; i < n - 1; i++) {
    if (list[i].selectedCategory !== list[i + 1].selectedCategory) {
      newArr.push(list[i]);
    }
  }
  newArr.push(list[n - 1]);
  return newArr;
}
