'use client';
import { useState } from "react";
import styles from "./Navbar.module.css";
export default function Navbar() {
  const[isClicked, setClicked] = useState(false);
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
                <img src="/navLogo.png" className={styles.brandLogo}></img>
              </li>
              <li className={styles.brandName}>PantryPulse</li>
            </ul>
          </div>
          <div className={styles.sSeg}>
            <ul className={styles.navList}>
              <li onClick={toggleSearchWrapper}>
                <img className={styles.searchIcon} src="/searchIcon.svg"></img>
              </li>
              <li>
                <img src="/cart.png" className={styles.cartIcon}></img>
              </li>
              <li className={styles.profileState}>
                <button id="loginButton">Login</button>
              </li>
            </ul>
          </div>
        </div>
        <div className={isClicked ? styles.searchWrapperInactive : styles.searchWrapper }>
          <div className= {styles.closeButtonContainer}>
            <img src = "/crossIcon.png" className={styles.closeButton} onClick={toggleSearchWrapper}></img>
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
