"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/common/dropdown.png";
import clsx from "clsx"; //for multiple classes
import crossIcon from "/public/common/crossicon.svg";
import { getCategories } from "../addProductCategories/handler";
import productImageIcon from "/public/admin/productImageIcon.png";
//TODO : complete custom file upload button and mechanism

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [rotate, setRotate] = useState(false); // State to handle rotation
  const [isChecked, setIsChecked] = useState(false);
  const [isImageUploaded, setImageUploadStatus] = useState(false);
  const [image, setImage] = useState(null);
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
  useEffect(() => {
    if (image && image.file) {
      setImageUploadStatus(true);
    } else {
      setImageUploadStatus(false);
    }
  }, [image]);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Access the first file
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the file
      setImage({
        file: file,
        URL: imageUrl,
      });
    } else {
      console.error("No file selected or invalid file");
    }
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
              {isImageUploaded ? (
                <Image src={image.URL} width={300} height={200} alt = "selected image"></Image>
              ) : (
                <label
                  className={styles.productImageButton}
                  
                  htmlFor="file-upload"
                >
                  <input id="file-upload" type="file" onChange={handleImageUpload}></input>
                  <Image src={productImageIcon}></Image>
                </label>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
