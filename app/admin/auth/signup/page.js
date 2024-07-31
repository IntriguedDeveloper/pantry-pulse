"use client";

import { useState } from "react";
import styles from "./adminAuthSignUp.module.css";
import { AdminAuthorizationSignUp } from "../handler";

export default function AdminAuthSignUp({ AlertMessage = false }) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("adminEmail", adminEmail);
    formData.append("adminPassword", adminPassword);

    // Call AdminAuthorization function with form data
    await AdminAuthorizationSignUp(formData);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <h1>PantryPulse</h1>
          <h2>Welcome admin!</h2>
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              type="email"
              name="adminEmail"
              placeholder="Enter your email : "
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <input
              type="password"
              name="adminPassword"
              placeholder="Enter your password : "
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}
