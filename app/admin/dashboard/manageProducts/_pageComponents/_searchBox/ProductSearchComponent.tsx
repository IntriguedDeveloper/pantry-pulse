"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProductSearch.module.css";
import Image from "next/image";
import { ProductDetails } from "../../../addProduct/ClientComponent";
import crossIcon from "@/public/common/crossIcon.svg";
import leftArrow from "@/public/common/left-arrow.png";
import { searchCategories } from "./handler";

export default function ProductSearchComponent({
  categoryList,
  handleSearchToggle,
}: {
  categoryList: ProductDetails[];
  handleSearchToggle: () => void;
}) {
  const [categorySearchState, setSearchState] = useState(true);
  const [isCrossClicked, setIsCrossClicked] = useState(false);
  const [clickedCategory, setClickedCategory] = useState("");

  const slicedArray = useMemo(
    () => removeDuplicateCategories(categoryList),
    [categoryList]
  ); //expensive operation

  const [mapableArray, setMapableArray] =
    useState<ProductDetails[]>(slicedArray);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchedInput, setDebouncedSearchInput] = useState("");

  useEffect(() => {
    if(!searchInput){
      setMapableArray(slicedArray);
    }
    const fetchSortedList = async () => {
      try {
        const sortedList = await searchCategories(
          slicedArray,
          debouncedSearchedInput
        );
        setMapableArray(sortedList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSortedList();
  }, [debouncedSearchedInput]); // Use debounced input

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 300);
    return () => {
      clearTimeout(timeOutID);
    };
  }, [searchInput]); //onChange input debouncing

  const handleCrossClick = () => {
    setIsCrossClicked(!isCrossClicked);
    handleSearchToggle();
  };

  const categoryClicked = (selectedCategory: string) => {
    setSearchState(!categorySearchState);
    setClickedCategory(selectedCategory);
  };

  const handleLeftArrowClick = () => {
    setSearchState(!categorySearchState);
    setClickedCategory("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
          />
          <input
            type="text"
            className={styles.searchBox}
            placeholder={
              categorySearchState
                ? "Search for product categories"
                : `Search for products in category : ${clickedCategory}`
            }
            onChange={handleSearch}
          />
          <div className={styles.cardContainer}>
            {categorySearchState ? (
              searchInput === "" ? (
                mapableArray.map((product: ProductDetails, index: number) => (
                  <CategoryInfoCard
                    categoryName={product.selectedCategory}
                    categoryImageURL={product.productImage}
                    clickCallback={categoryClicked}
                    key={index}
                  />
                ))
              ) : mapableArray.filter((product) => product.matchCounter > 2)
                  .length > 0 ? (
                mapableArray
                  .filter((product) => product.matchCounter > 2)
                  .map((product: ProductDetails, index: number) => (
                    <CategoryInfoCard
                      categoryName={product.selectedCategory}
                      categoryImageURL={product.productImage}
                      clickCallback={categoryClicked}
                      key={index}
                    />
                  ))
              ) : (
                <div>No products found</div>
              )
            ) : (
              categoryList.map((product: ProductDetails, index: number) =>
                product.selectedCategory === clickedCategory ? (
                  <ProductInfoCard
                    productName={product.productName}
                    brandName={product.brandName}
                    stockQuantity={product.stockQuantity}
                    imageURL={product.productImage}
                    key={index}
                    handleLeftArrowClick={handleLeftArrowClick}
                  />
                ) : null
              )
            )}
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
  handleLeftArrowClick,
}: {
  productName: string;
  brandName: string;
  stockQuantity: number;
  imageURL: string;
  handleLeftArrowClick: () => void;
}) {
  return (
    <div className={styles.productWrapper}>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={imageURL}
            height={100}
            width={100}
            alt="Product Image"
            className={styles.itemImage}
          />
        </div>
        <div className={styles.productDetailsContainer}>
          <a>{productName}</a>
          <a>{brandName}</a>
          <a>{stockQuantity}</a>
        </div>
      </div>
      <Image
        src={leftArrow}
        alt="Left Arrow"
        className={styles.leftArrow}
        onClick={handleLeftArrowClick}
      />
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
    <div
      className={styles.itemContainer}
      onClick={() => {
        clickCallback(categoryName);
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={categoryImageURL}
          className={styles.itemImage}
          alt="Category Image"
          height={120}
          width={150}
        />
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
  if (n === 0 || n === 1) {
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
