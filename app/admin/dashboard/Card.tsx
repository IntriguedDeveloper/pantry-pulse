"use client";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
type CardType = {
  title: string;
  image: StaticImageData | string | StaticImport;
  routePath: string;
};
export default function Card({ title, image, routePath }: CardType) {
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
