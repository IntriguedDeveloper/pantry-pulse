"use client";
import styles from "./adminAuthLogin.module.css";
import { AdminAuthorizationLogin } from "../handler";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function AdminAuthLogin({ AdminState }) {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminState, setAdminState] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("adminEmail", adminEmail);
    formData.append("adminPassword", adminPassword);
    console.info("function triggered")
    // Call AdminAuthorization function with form data
    const response = await AdminAuthorizationLogin(formData);
    console.info("await over")
    setAdminState(response.adminState);
  };

  useEffect(() => {
    if(adminState == true) {
      signInWithEmailAndPassword(auth, adminEmail, adminPassword)
      .then((userCredential) => {
        router.push('/admin/dashboard');
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message)
        alert("Wrong email or password")
        setAdminState(null);
      });
    }
    else if(adminState == false){
      alert("You are not authorized as admin");
      setAdminState(null);
    }
    
  }, [adminState]);

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
