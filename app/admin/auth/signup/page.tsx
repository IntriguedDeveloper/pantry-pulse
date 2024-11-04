"use client";

import { useEffect, useState } from "react";
import styles from "./adminAuthSignUp.module.css";
import { AdminAuthorizationSignUp } from "../handler";
import { useRouter } from "next/navigation";
export default function AdminAuthSignUp() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<boolean>(false);
  const [isSubmit, setSubmit] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("adminEmail", adminEmail);
      formData.append("adminPassword", adminPassword);

      const response = await AdminAuthorizationSignUp(formData);
      if (response.alertMessage != undefined) {
        setAlertMessage(response.alertMessage);
      }
    };
    handleSubmit();
  }, [isSubmit]);

  useEffect(() => {
    if (alertMessage == true) {
      alert("Signup successful");
      router.push("/admin/auth/login");
    }
  }, [alertMessage]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <h1>PantryPulse</h1>
          <h2>Welcome admin!</h2>
          <form
            className={styles.inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmit(true);
            }}
          >
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
