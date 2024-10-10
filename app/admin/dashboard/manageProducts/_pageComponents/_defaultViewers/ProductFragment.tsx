import Image from "next/image";
import styles from "./DropDownStyles.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
//TODO: fix LCP issue
export default function ProductFragment({
  productName,
  brandName,
  stockQuantity,
  productImage,
}: {
  productName: string;
  brandName: string;
  stockQuantity: number;
  productImage: string;
}) {
  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.imageDiv}>
        <Image
          src={productImage}
          alt="productImage"
          height={120}
          width={120}
          placeholder="empty"
          priority
        ></Image>
      </div>
      <div className={styles.detailsDiv}>
        <a>{productName}</a>
        <a>{brandName}</a>
        <a>{stockQuantity}</a>
      </div>
    </div>
  );
}
