import { db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

// 🔹 Register
export const registerUser = async (userUUID, user) => {
  try {
    const docRef = await setDoc(doc(db, "users", userUUID), user);
    console.log("Document written: ", docRef);
  } catch (error) {
    console.error("Error register user:", error);
    throw error;
  }
};
