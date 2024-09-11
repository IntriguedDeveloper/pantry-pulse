"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SuccessPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("../../dashboard"); // Adjust path as needed
  };

  const handleAddAnotherProduct = () => {
    router.push("../addProduct"); // Adjust path as needed
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.messageBox}>
          <h1 className={styles.successMessage}>Product Added Successfully!</h1>
          <div className={styles.buttonContainer}>
            <button className={styles.homeButton} onClick={handleGoHome}>
              Go to Home
            </button>
            <button
              className={styles.addProductButton}
              onClick={handleAddAnotherProduct}
            >
              Add Another Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
