import styles from "./dashboard.module.css";
import Card from "./Card";
import addProductIcon from "/public/admin/addProductIcon.png";
import editProductIcon from "/public/admin/editProductIcon.png";
import productCategoryIcon from "/public/admin/productCategoriesIcon.png";
import deleteProductIcon from "/public/admin/bin.png";

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.headerDiv}>Welcome to admin dash</div>
      <div className={styles.actionCategories}>
        <Card
          title={"Add New Product"}
          image={addProductIcon}
          routePath={"./dashboard/addProduct"}
        ></Card>
        <Card title={"Manage Existing Products"} image={editProductIcon}
        routePath={"./dashboard/manageProducts"}></Card>
        <Card
          title={"Manage Categories"}
          image={productCategoryIcon}
          routePath={"./dashboard/addProductCategories"}
        ></Card>
        
      </div>
    </div>
  );
}
