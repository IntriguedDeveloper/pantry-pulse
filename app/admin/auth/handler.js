"use server";
import AdminAuthSignUp from "./signup/page";
import AdminAuthLogin from "./login/page";
const adminKey = require("@/firebase/adminKey.json");
const admin = require("firebase-admin");
const adminAuth = require("firebase-admin/auth");
export async function AdminAuthorizationSignUp(formData) {
  let alertMessage;
  if (!admin.apps.length) {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(adminKey),
    });
  }
  adminAuth
    .getAuth()
    .getUserByEmail(formData.get("adminEmail"))
    .then((response) => {
      console.log("Found user");
      adminAuth.getAuth().setCustomUserClaims(response.uid, { admin: true });
    })
    .catch((error) => {
      console.log(error);
      if (error.code == "auth/user-not-found") {
        console.log("user not found");
        alertMessage = true;
        return <AdminAuthSignUp AlertMessage={true}></AdminAuthSignUp>;
      }
    });

  console.log([...formData.entries()]);
}

export async function AdminAuthorizationLogin(formData) {
  let adminState;
  if (!admin.apps.length) {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(adminKey),
    });
  }
  adminAuth
    .getAuth()
    .getUserByEmail(formData.get("adminEmail"))
    .then((userRecord) => {
      console.log(userRecord);
      console.log(userRecord.customClaims);
      if (userRecord.customClaims.admin === true) {
        adminState = true;
      } else {
        adminState = false;
      }
      return AdminAuthLogin(adminState);
    });
}
