"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./ManageProducts.module.css";
import searchIcon from "@public/client/searchIcon.svg";
import DropDownProductComponent from "./_defaultViewers/DropDownProductComponent";
import ProductSearchComponent from "./_searchBox/ProductSearchComponent";
import { getProducts } from "../handler"; // Server action

export default function ManageProducts() {
  const [searchState, setSearchState] = useState(true);
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

  const handleSearchToggle = () => {
    setSearchState(!searchState);
  };

  const handleSearchEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setSearchState(!searchState);
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className={styles.centerSpinner}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  // Show error if occurred
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
            />
          ) : (
            <DropDownProductComponent data={categoryArray} />
          )}
        </div>
      </div>
    </>
  );
}
