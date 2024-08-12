"use client";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Card({ title, image, routePath }) {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(routePath);
      }}
    >
      <div className={styles.iconContainer}>
        <h2>{title}</h2>
      </div>
      <div className={styles.dialogCont}>
        <Image src={image} width={30} height={30} alt="IMAGE"></Image>
      </div>
    </div>
  );
}
