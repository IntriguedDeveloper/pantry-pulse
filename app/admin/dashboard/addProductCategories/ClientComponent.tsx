"use client";
import { useState } from "react";
import { addCategory, deleteCategory } from "./handler";
import Image from "next/image";
import deleteIcon from "/public/admin/deleteIcon.svg";
import styles from "./page.module.css";
type categoryProp = {
  categories: string[];
};
export default function ClientComponent({
  categories: initialCategories,
}: categoryProp) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      setIsLoading(true);
      await addCategory(newCategory);
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setIsLoading(false);
    }
  };

  const handleCategoryDeletion = async (
    categoryName: string,
    index: number
  ) => {
    setIsLoading(true);
    await deleteCategory(categoryName);
    setCategories(categories.filter((_, i) => i !== index));
    setIsLoading(false);
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
                  onClick={() => handleCategoryDeletion(category, index)}
                  alt="deleteicon"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
