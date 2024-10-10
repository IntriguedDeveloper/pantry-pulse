"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./ManageProducts.module.css";
import searchIcon from "@public/client/searchIcon.svg";
import DropDownProductComponent from "./_defaultViewers/DropDownProductComponent";
import ProductSearchComponent from "./_searchBox/ProductSearchComponent";
import { getProducts } from "../handler";

export default function ManageProducts() {
  const [searchState, setSearchState] = useState(false);
  const [categoryArray, setCategoryArray] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setCategoryArray(products);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const slicedArray = useMemo(
    () => removeDuplicateCategories(categoryArray),
    [categoryArray]
  ); //expensive operation
  const handleSearchToggle = () => {
    setSearchState(!searchState);
  };

  const handleSearchEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setSearchState(!searchState);
  };


  if (loading) {
    return (
      <div className={styles.centerSpinner}>
        <div className={styles.spinner}></div>
      </div>
    );
  }


  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.upperNav}>
          <h2>Manage Products</h2>
          <Image
            src={searchIcon}
            alt="Search Icon"
            onClick={handleSearchEvent}
            className={styles.searchIcon}
          />
        </div>
        <div className={styles.container}>
          {searchState && categoryArray.length > 0 ? (
            <ProductSearchComponent
              categoryList={categoryArray}
              handleSearchToggle={handleSearchToggle}
              slicedArray = {slicedArray}
            />
          ) : (
            <DropDownProductComponent data={categoryArray} slicedArray = {slicedArray}/>
          )}
        </div>
      </div>
    </>
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
