"use client";
import Image from "next/image";
import styles from "./ManageProducts.module.css";
import searchIcon from "@public/client/searchIcon.svg";
import { useState } from "react";
import DropDownProductComponent from "./DropDownProductComponent";
export default function ({ categoryArray }: { categoryArray: String[] }) {
  const [searchState, setSearchState] = useState(false);
  const handleSearchEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setSearchState(!searchState);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.upperNav}>
          <h2>Manage Products</h2>
          <Image
            src={searchIcon}
            alt="Search Icon"
            onClick={handleSearchEvent}
          ></Image>
        </div>
        <div className={styles.container}>
          {searchState ? (
            <h1>Search Box</h1>
          ) : (
            <DropDownProductComponent
              categoryName={"veggies"}
            ></DropDownProductComponent>
          )}
        </div>
      </div>
    </>
  );
}
