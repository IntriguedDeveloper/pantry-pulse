"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import deleteIcon from "/public/admin/deleteIcon.svg";
import Image from "next/image";
import { addCategory, getCategories, deleteCategory } from "./handler";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to display categories");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);
  // Handle the input change
  const handleInputChange = async (event) => {
    setNewCategory(event.target.value);
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      await addCategory(newCategory);
      setCategories([...categories, newCategory]);

      setNewCategory(""); // Clear the input field after adding
    }
  };
  const handleCategoryDeletion = async (categoryName, index) => {
    await deleteCategory(categoryName);
    const updatedCategories = categories.filter((_, i) => i != index);
    setCategories(updatedCategories);
  };
  return (
    <div className={styles.container}>
      <div className={styles.addCategoryContainer}>
        <input
          type="text"
          value={newCategory}
          onChange={handleInputChange}
          placeholder="Enter category"
          className={styles.inputBox}
        />
        <button onClick={handleAddCategory} className={styles.addButton}>
          Add Category
        </button>
      </div>
      <div className={styles.categoryList}>
        <h3>Categories</h3>
        {isLoading ? (
          <span className={styles.loader}></span>
        ) : categories.length === 0 ? (
          <p className={styles.emptyMessage}>No categories added yet.</p>
        ) : (
          <ul className={styles.ul}>
            {categories.map((category, index) => (
              <li key={index} className={styles.li}>
                {category}
                <Image
                  src={deleteIcon}
                  className={styles.categoryDeleteIcon}
                  onClick={() => {
                    handleCategoryDeletion(category, index);
                  }}
                  alt="deleteicon"
                ></Image>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
