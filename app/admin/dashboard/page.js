import styles from "./dashboard.module.css";
import Card from "./Card";
import addProductIcon from "/public/addProductIcon.png";
import editProductIcon from "/public/editProductIcon.png";
import productCategoryIcon from "/public/productCategoriesIcon.png";
import deleteProductIcon from "/public/bin.png";
export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.headerDiv}>Welcome to admin dash</div>
      <div className={styles.actionCategories}>
        <Card title={"Add New Product"} image={addProductIcon}></Card>
        <Card title={"Edit Existing Products"} image={editProductIcon}></Card>
        <Card
          title={"Make new product category"}
          image={productCategoryIcon}
        ></Card>
        <Card title={"Delete Products"} image={deleteProductIcon}></Card>
      </div>
    </div>
  );
}
