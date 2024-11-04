"use server";
import admin from "firebase-admin";
import { initializeApp, credential } from "firebase-admin";
import { getAuth, UserRecord } from "firebase-admin/auth";
import adminKey from "@/firebase/adminKey.json";
const SERVICE_ACCOUNT_KEY: any = adminKey;
export async function AdminAuthorizationSignUp(
  formData: FormData
):  Promise<{ alertMessage: boolean }> {
  let alertMessage = false;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(SERVICE_ACCOUNT_KEY),
    });
  }
  const adminEmail = formData.get("adminEmail");
  if (typeof adminEmail !== "string") {
    console.error("adminEmail is not a valid string");
    return { alertMessage };
  } //type checking

  try {
    const response = await getAuth().getUserByEmail(adminEmail);
    console.log("Found user");
    await getAuth().setCustomUserClaims(response.uid, { admin: true });
    alertMessage = true;
  } catch (error: any) {
    alertMessage = false;
    console.log(error);
    if (error.code === "auth/user-not-found") {
      console.log("User not found");
      alertMessage = true;
    }
  }

  console.log([...formData.entries()]);
  console.log(alertMessage);
  return { alertMessage };
}

export async function AdminAuthorizationLogin(formData: FormData) {
  let adminState;
  let alertMessage = false;
  // Initialize Firebase Admin if it hasn't been initialized yet
  if (!admin.apps.length) {
    initializeApp({
      credential: credential.cert(SERVICE_ACCOUNT_KEY),
    });
  }
  const adminEmail = formData.get("adminEmail");
  if (typeof adminEmail !== "string") {
    console.error("adminEmail is not a valid string");
    return { alertMessage };
  }

  try {
    const userRecord = await getAuth().getUserByEmail(adminEmail);
    if (userRecord.customClaims && userRecord.customClaims.admin === true) {
      console.log("User is admin");
      adminState = true;
    } else {
      adminState = false;
    }
  } catch (error) {
    console.log(error);
    adminState = false; // Ensure adminState is set in case of error
  }

  console.log(adminState);
  return { adminState };
}
