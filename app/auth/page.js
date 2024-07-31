"use client";
import styles from "./authPage.module.css";
import app from "@/firebase/clientApp";
export default function AuthPage() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <div className={styles.brandDetailsContainer}>
            <img src="/brandLogo.png"></img>
            <h1 className={styles.brandName}>Pantry Pulse</h1>
          </div>
          <div className={styles.inputFormContainer}>
            <form>
              <input type="text" placeholder="Enter your email-id : "></input>
              <input
                type="password"
                placeholder="Enter your password : "
              ></input>
              <button>Login</button>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
