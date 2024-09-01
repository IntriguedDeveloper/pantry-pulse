'use client';
import { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import brandLogo from '/public/client/brandLogo.png'
import searchIcon from '/public/client/searchIcon.svg'
import cartIcon from '/public/client/cart.png'
import crossIcon from '/public/common/crossIcon.svg'
export default function Navbar() {
  const[isClicked, setClicked] = useState(true);
  const toggleSearchWrapper = () => {
    setClicked(!isClicked);
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.navBarWrapper}>
          <div className={styles.fSeg}>
            <ul className={styles.navList}>
              <li>
                <Image src={brandLogo} className={styles.brandLogo} alt = "Brand Logo"></Image>
              </li>
              <li className={styles.brandName}>PantryPulse</li>
            </ul>
          </div>
          <div className={styles.sSeg}>
            <ul className={styles.navList}>
              <li onClick={toggleSearchWrapper}>
                <Image className={styles.searchIcon} src={searchIcon} alt = "search icon"></Image>
              </li>
              <li>
                <Image src={cartIcon} className={styles.cartIcon} alt = "cart icon"></Image>
              </li>
              <li className={styles.profileState}>
                <button id="loginButton">Login</button>
              </li>
            </ul>
          </div>
        </div>
        <div className={isClicked ? styles.searchWrapperInactive : styles.searchWrapper }>
          <div className= {styles.closeButtonContainer}>
            <Image src = {crossIcon} className={styles.closeButton} onClick={toggleSearchWrapper} alt = "cross icon"></Image>
          </div>
          <div className={styles.searchBarContainer}>
            <input placeholder="Search" className={styles.searchBar}></input>
          </div>
          <div className={styles.searchResultsContainer}>
            <ul className={styles.searchResultsList}>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
              <li className={styles.searchResult}>Vegetable</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
