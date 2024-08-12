"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/dropdown.png";

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.inputForm}>
            <input
              placeholder="Enter name of product"
              type="text"
              className={styles.inputBox}
            ></input>
            <div className={styles.dropDownWrapper}>
              <div className={styles.dropDownButton} onClick={toggleDropdown}>
                Select a category
                <Image
                  src={dropDownIcon}
                  className={styles.dropDownIcon}
                ></Image>
              </div>
              {isVisible && (
                <div className={styles.dropDownOverlayContainer}>
                  <div className={styles.dropDownDiv}>
                    <div className={styles.dropDownSearchBarContainer}>
                      <input type="text" className={styles.searchBar}></input>
                    </div>
                    <ul className={styles.categoryNames}>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                      <li>Product Name</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
