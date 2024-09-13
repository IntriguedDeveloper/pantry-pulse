"use client";
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

export default function ClientComponent({ categories: initialCategories }) {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [rotate, setRotate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isImageUploaded, setImageUploadStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState({
    status: false,
    categoryName: "",
  });
  const [swipeCount, setSwipeCount] = useState(0);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    brandName: "",
    SKUCode: "",
    productDescription: "",
    selectedCategory: "",
    productPrice: "",
    discountPercentage: "",
    stockQuantity: "",
    isProductAvailableForSale: false,
    productWeight: "",
  });

  useEffect(() => {
    if (image) {
      setImageUploadStatus(true);
    } else {
      setImageUploadStatus(false);
    }
  }, [image]);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
    setRotate(!rotate);
    setIsCategorySelected({
      status: false,
      categoryName: "",
    });
  };

  const handleCategorySelection = (categoryName) => {
    setIsCategorySelected({
      status: true,
      categoryName: categoryName,
    });
    setProductDetails({ ...productDetails, selectedCategory: categoryName });
    setIsVisible(false);
    setRotate(false);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setProductDetails({
      ...productDetails,
      isProductAvailableForSale: !isChecked,
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const fileArray = files.map((file, index) => ({
        file,
        URL: URL.createObjectURL(file),
        index: index,
      }));
      setImage({
        files: fileArray,
      });
    } else {
      console.error("No file selected or invalid file");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const collectionRef = collection(db, "admin", "product-doc", "products");
    const docRef = await addDoc(collectionRef, productDetails);
    const metadata = {
      customMetadata: {
        docRefID: docRef.id,
      },
    };

    if (image != null) {
      image.files.map(async (fileObject, index) => {
        const imageCollectionRef = ref(
          storage,
          `products/${isCategorySelected.categoryName}/${docRef.id}/${index}`
        );
        await uploadBytes(imageCollectionRef, fileObject.file, metadata)
          .then(() => {
            router.push("./addProduct/uploadSuccessPage");
          })
          .catch((error) => {
            alert("Error Uploading Images", error);
          });
      });
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
                type="text"
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
                    />{" "}
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
                          onClick={() => {
                            handleCategorySelection(category);
                          }}
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
                  {image.files.map((fileObject, index) => {
                    return swipeCount === fileObject.index ? (
                      <Image
                        src={fileObject.URL}
                        width={300}
                        height={200}
                        alt="selected image"
                        key={index}
                      />
                    ) : null;
                  })}
                  <Image
                    src={swipeArrow}
                    className={styles.swipeArrowRight}
                    alt="arrow"
                    onClick={() => {
                      setSwipeCount((prevCount) =>
                        prevCount >= image.files.length - 1 ? 0 : swipeCount + 1
                      );
                    }}
                  />
                  <Image
                    src={swipeArrow}
                    alt="arrow"
                    className={styles.swipeArrowLeft}
                    onClick={() => {
                      setSwipeCount((prevCount) =>
                        prevCount <= 0 ? image.files.length - 1 : swipeCount - 1
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
                  <Image src={productImageIcon} />
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
