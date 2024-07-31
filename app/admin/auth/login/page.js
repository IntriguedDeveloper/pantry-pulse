"use client";
import styles from "./adminAuthLogin.module.css";
import { AdminAuthorizationLogin } from "../handler";
import { useState } from "react";
export default function AdminAuthLogin({AdminState = false}) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("adminEmail", adminEmail);
    formData.append("adminPassword", adminPassword);

    // Call AdminAuthorization function with form data
    await AdminAuthorizationLogin(formData);

    
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <h1>PantryPulse</h1>
        <h2>Admin Login Page</h2>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            type="email"
            name="adminEmail"
            placeholder="Enter your email : "
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            name="adminPassword"
            placeholder="Enter your password : "
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
