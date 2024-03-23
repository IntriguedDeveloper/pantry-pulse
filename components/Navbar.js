import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <>
      <div className={styles.wrapper}>
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
            <li>
              <img className = {styles.searchIcon} src="/searchIcon.svg"></img>
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
    </>
  );
}
