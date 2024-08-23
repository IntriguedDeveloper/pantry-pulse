"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/dropdown.png";
import crossIcon from "/public/crossicon.svg";
import { getCategories } from "../addProductCategories/handler";

export default function AddProductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [rotate, setRotate] = useState(false); // State to handle rotation
  const [isCategorySelected, setIsCategorySelected] = useState({
    status: false,
    categoryName: "",
  });
  //hello 
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
            <input
              placeholder="Enter name of product"
              type="text"
              className={styles.inputBox}
            ></input>
            <div
              className={styles.dropDownButton} // Add rotation class conditionally
              onClick={toggleDropdown}
            >
              {isCategorySelected.status ? (
                isCategorySelected.categoryName
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
          </form>
        </div>
      </div>
    </>
  );
}
