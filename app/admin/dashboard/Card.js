import styles from "./cardStyles.module.css";
import Image from "next/image";
export default function Card({ title, image }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <h2>{title}</h2>
      </div>
      <div className={styles.dialogCont}>
        <Image src={image} width={30} height={30} alt = "IMAGE"></Image>
      </div>
    </div>
  );
}
