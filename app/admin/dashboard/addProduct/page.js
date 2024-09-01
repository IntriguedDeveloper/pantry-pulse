"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/common/dropdown.png";
import clsx from "clsx"; //for multiple classes
import crossIcon from "/public/common/crossicon.svg";
import { getCategories } from "../addProductCategories/handler";
//TODO : add other input fields and complete add product page frontend

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [rotate, setRotate] = useState(false); // State to handle rotation
  const [isChecked, setIsChecked] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState({
    status: false,
    categoryName: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        console.log(fetchedCategories);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to display categories");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
    setRotate(!rotate); // Trigger rotation
    setIsCategorySelected({
      status: false,
      categoryName: "",
    });
  };

  const handleCategorySelection = (categoryName) => {
    setIsCategorySelected({
      status: true,
      categoryName: categoryName,
    });
    setIsVisible(false);
    setRotate(false);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Moderustic:wght@300..800&display=swap"
        rel="stylesheet"
      ></link>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.inputForm}>
            <div className={styles.basicProductInfoContainer}>
              <h3>Basic Product Info</h3>
              <input
                placeholder="Enter name of product"
                type="text"
                className={styles.inputBox}
              ></input>
              <input
                placeholder="Enter brand name of product : "
                className={styles.inputBox}
              ></input>
              <input
                placeholder="Enter SKU code : "
                className={styles.inputBox}
              ></input>
              <textarea
                placeholder="Enter product description : "
                type="text"
                className={styles.inputDescriptionBox}
              ></textarea>
              <div
                className={styles.dropDownButton} // Add rotation class conditionally
                onClick={toggleDropdown}
              >
                {isCategorySelected.status ? (
                  "Selected Category : " + isCategorySelected.categoryName
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Select a Category{" "}
                    <Image
                      src={dropDownIcon}
                      className={`${styles.dropDownIcon} ${
                        rotate ? styles.rotate : ""
                      }`}
                      alt="dropdown"
                    ></Image>{" "}
                  </div>
                )}
              </div>
              {isVisible && (
                <div className={styles.dropDownOverlayContainer}>
                  <div className={styles.dropDownDiv}>
                    <ul className={styles.categoryNames}>
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className={styles.category}
                          onClick={() => {
                            handleCategorySelection(category);
                          }}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.productPricingInfoContainer}>
              <h3>Product Pricing Information</h3>
              <input
                type="number"
                placeholder="Enter the price in Rs. : "
                className={clsx(styles.inputBox, styles.numberInput)}
                min="0"
              ></input>{" "}
              {/*use clsx to apply multiple classnames*/}
              <input
                type="number"
                placeholder="Enter discount percentage : "
                className={clsx(styles.inputBox, styles.numberInput)}
                min="0"
              ></input>
            </div>
            <div className={styles.inventoryDetailsContainer}>
              <h3>Inventory Details</h3>
              <input
                type="number"
                className={clsx(styles.inputBox, styles.numberInput)}
                placeholder="Enter current stock quantity : "
              ></input>
              <div className={styles.checkboxContainer} onClick={handleToggle}>
                <span
                  className={`${styles.customCheckbox} ${
                    isChecked ? styles.checked : ""
                  }`}
                >
                  {isChecked ? "✔" : ""}
                </span>
                <label className={styles.checkboxLabel}>
                  Is product available for Sale ?
                </label>
              </div>
            </div>
            <div className={styles.productSpecificationContainer}>
              <h3>Product Specifications</h3>
              <input
                className={clsx(styles.inputBox, styles.numberInput)}
                placeholder="Enter weight of product (in grams) : "
                type="number"
                min="0"
              ></input>
            </div>
            <div className={styles.productMediaContainer}>
              <h3>Product Media</h3>
              <input type = "file"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
