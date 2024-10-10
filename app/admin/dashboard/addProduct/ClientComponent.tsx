"use client";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import dropDownIcon from "/public/common/dropdown.png";
import clsx from "clsx";
import swipeArrow from "/public/admin/rightarrow.svg";
import productImageIcon from "/public/admin/productImageIcon.png";
import { db, storage } from "@/firebase/clientApp";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

type FileObject = {
  file: File;
  URL: string;
  index: number;
};

type ImageState = {
  files: FileObject[];
} | null;

type CategorySelection = {
  status: boolean;
  categoryName: string;
};

export type ProductDetails = {
  productName: string;
  brandName: string;
  SKUCode: string;
  productDescription: string;
  selectedCategory: string;
  productPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  isProductAvailableForSale: boolean;
  productWeight: number;
  productImage?: any;
  matchCounter?: any;
};

type ClientProps = {
  categories: String[];
};

export default function ClientComponent({
  categories: initialCategories,
}: ClientProps) {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<String[]>(initialCategories);
  const [rotate, setRotate] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isImageUploaded, setImageUploadStatus] = useState<boolean>(false);
  const [image, setImage] = useState<ImageState>(null);
  const [isCategorySelected, setIsCategorySelected] =
    useState<CategorySelection>({
      status: false,
      categoryName: "",
    });
  const [swipeCount, setSwipeCount] = useState<number>(0);
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    productName: "",
    brandName: "",
    SKUCode: "",
    productDescription: "",
    selectedCategory: "",
    productPrice: 0,
    discountPercentage: 0,
    stockQuantity: 0,
    isProductAvailableForSale: false,
    productWeight: 0,
  });

  useEffect(() => {
    setImageUploadStatus(image !== null);
  }, [image]);

  const toggleDropdown = () => {
    setIsVisible((prev) => !prev);
    setRotate((prev) => !prev);
    setIsCategorySelected({
      status: false,
      categoryName: "",
    });
  };

  const handleCategorySelection = (categoryName: string) => {
    setIsCategorySelected({
      status: true,
      categoryName: categoryName,
    });
    setProductDetails((prev) => ({
      ...prev,
      selectedCategory: categoryName,
    }));
    setIsVisible(false);
    setRotate(false);
  };

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    setProductDetails((prev) => ({
      ...prev,
      isProductAvailableForSale: !isChecked,
    }));
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB size limit
    const validFiles: FileObject[] = [];
    let hasInvalidFile = false;

    files.forEach((file, index) => {
      if (file.size <= MAX_FILE_SIZE) {
        validFiles.push({
          file,
          URL: URL.createObjectURL(file),
          index: index,
        });
      } else {
        hasInvalidFile = true;
        alert(`File ${file.name} is too large. Max file size is 2MB.`);
      }
    });

    if (validFiles.length > 0) {
      setImage({ files: validFiles });
    }

    if (!hasInvalidFile && validFiles.length === 0) {
      console.error("No valid file selected or invalid file");
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const collectionRef = collection(db, "admin", "product-doc", "products");
    const docRef = await addDoc(collectionRef, productDetails);
    const metadata = {
      customMetadata: {
        docRefID: docRef.id,
      },
    };

    if (image) {
      for (const fileObject of image.files) {
        const imageCollectionRef = ref(
          storage,
          `products/${isCategorySelected.categoryName}/${docRef.id}/${fileObject.index}`
        );
        try {
          await uploadBytes(imageCollectionRef, fileObject.file, metadata);
        } catch (error) {
          alert(`Error Uploading Images: ${error}`);
          return;
        }
      }
      router.push("./addProduct/uploadSuccessPage");
    } else {
      alert("Please add an image");
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Moderustic:wght@300..800&display=swap"
        rel="stylesheet"
      ></link>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.inputForm} onSubmit={handleFormSubmit}>
            <div className={styles.basicProductInfoContainer}>
              <h3>Basic Product Info</h3>
              <input
                placeholder="Enter name of product"
                type="text"
                className={styles.inputBox}
                name="productName"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Enter brand name of product : "
                className={styles.inputBox}
                name="brandName"
                onChange={handleChange}
                required
              />
              <input
                placeholder="Enter SKU code : "
                className={styles.inputBox}
                name="SKUCode"
                onChange={handleChange}
                required
              />
              <textarea
                placeholder="Enter product description : "
                className={styles.inputDescriptionBox}
                name="productDescription"
                onChange={handleChange}
                required
              />
              <div className={styles.dropDownButton} onClick={toggleDropdown}>
                {isCategorySelected.status ? (
                  "Selected Category : " + isCategorySelected.categoryName
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Select a Category{" "}
                    <Image
                      src={dropDownIcon}
                      className={`${styles.dropDownIcon} ${
                        rotate ? styles.rotate : ""
                      }`}
                      alt="dropdown"
                    />
                  </div>
                )}
              </div>
              {isVisible && (
                <div className={styles.dropDownOverlayContainer}>
                  <div className={styles.dropDownDiv}>
                    <ul className={styles.categoryNames}>
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className={styles.category}
                          onClick={() => handleCategorySelection(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.productPricingInfoContainer}>
              <h3>Product Pricing Information</h3>
              <input
                type="number"
                placeholder="Enter the price in Rs. : "
                className={clsx(styles.inputBox, styles.numberInput)}
                min="0"
                name="productPrice"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                placeholder="Enter discount percentage : "
                className={clsx(styles.inputBox, styles.numberInput)}
                min="0"
                name="discountPercentage"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inventoryDetailsContainer}>
              <h3>Inventory Details</h3>
              <input
                type="number"
                className={clsx(styles.inputBox, styles.numberInput)}
                placeholder="Enter current stock quantity : "
                name="stockQuantity"
                onChange={handleChange}
                required
              />
              <div className={styles.checkboxContainer} onClick={handleToggle}>
                <span
                  className={`${styles.customCheckbox} ${
                    isChecked ? styles.checked : ""
                  }`}
                >
                  {isChecked ? "✔" : ""}
                </span>
                <label className={styles.checkboxLabel}>
                  Is product available for Sale ?
                </label>
              </div>
            </div>
            <div className={styles.productSpecificationContainer}>
              <h3>Product Specifications</h3>
              <input
                className={clsx(styles.inputBox, styles.numberInput)}
                placeholder="Enter weight of product (in grams) : "
                type="number"
                min="0"
                name="productWeight"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.productMediaContainer}>
              <h3>Product Media</h3>
              {isImageUploaded ? (
                <div className={styles.selectedImageContainer}>
                  {image?.files.map((fileObject, index) =>
                    swipeCount === fileObject.index ? (
                      <Image
                        src={fileObject.URL}
                        width={300}
                        height={200}
                        alt="selected image"
                        key={index}
                      />
                    ) : null
                  )}
                  <Image
                    src={swipeArrow}
                    className={styles.swipeArrowRight}
                    alt="arrow"
                    onClick={() => {
                      setSwipeCount((prevCount) =>
                        prevCount >= (image?.files.length ?? 0) - 1
                          ? 0
                          : swipeCount + 1
                      );
                    }}
                  />
                  <Image
                    src={swipeArrow}
                    alt="arrow"
                    className={styles.swipeArrowLeft}
                    onClick={() => {
                      setSwipeCount((prevCount) =>
                        prevCount <= 0
                          ? (image?.files.length ?? 0) - 1
                          : swipeCount - 1
                      );
                    }}
                  />
                </div>
              ) : (
                <label
                  className={styles.productImageButton}
                  htmlFor="file-upload"
                >
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleImageUpload}
                    multiple
                    accept="image/jpeg,image/png, image/jpg"
                    required
                  />
                  <Image src={productImageIcon} alt="Product Image Icon" />
                </label>
              )}
            </div>
            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
