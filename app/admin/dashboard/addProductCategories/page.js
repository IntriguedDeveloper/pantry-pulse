"use client";
import { useState } from "react";
import styles from "./page.module.css";
import deleteIcon from '/public/deleteIcon.svg'
import Image from "next/image";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Handle the input change
  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory]);
      setNewCategory(""); // Clear the input field after adding
    }
  };
  const handleCategoryDeletion = (index) => {
    const updatedCategories = categories.filter((_ , i) => i != index)
    setCategories(updatedCategories)
  }
  return (
    <div className={styles.container}>
      <div className={styles.addCategory}>
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
        {categories.length === 0 ? (
          <p className={styles.emptyMessage}>No categories added yet.</p>
        ) : (
          <ul className={styles.ul}>
            {categories.map((category, index) => (
              <li key={index} className={styles.li}>
                {category}
                <Image src = {deleteIcon} className={styles.categoryDeleteIcon} onClick={() => {handleCategoryDeletion(index)}}></Image>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
