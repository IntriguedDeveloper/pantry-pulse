"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import deleteIcon from "/public/deleteIcon.svg";
import Image from "next/image";
import { addCategory, getCategories } from "./handler";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  
  //TODO : use next js suspense for loading spinner of categories
  //TODO : configure delete category function's backend

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
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
  const handleCategoryDeletion = (index) => {
    //delete by filtering by index
    const updatedCategories = categories.filter((_, i) => i != index);
    setCategories(updatedCategories);
  };
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
                <Image
                  src={deleteIcon}
                  className={styles.categoryDeleteIcon}
                  onClick={() => {
                    handleCategoryDeletion(index);
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
