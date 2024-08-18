"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/dropdown.png";
import crossIcon from "/public/crossicon.svg";
export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };
  const searchBarInputHandler = (event) => {
    setCategorySearchQuery(event.target.value);
    console.log(categorySearchQuery);
  }
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
            <div className={styles.dropDownButton} onClick={toggleDropdown}>
              Select a category
              <Image src={dropDownIcon} className={styles.dropDownIcon}></Image>
            </div>

            {isVisible && (
              <div className={styles.dropDownOverlayContainer}>
                <div className={styles.dropDownDiv}>
                  <Image
                    src={crossIcon}
                    className={styles.closeDropDown}
                    onClick={toggleDropdown}
                  ></Image>
                  <div className={styles.dropDownSearchBarContainer}>
                    <input type="text" className={styles.searchBar} onInput={searchBarInputHandler}></input>
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
          </form>
        </div>
      </div>
    </>
  );
}
