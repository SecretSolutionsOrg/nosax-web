import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

// Collection Reference
const researchCollection = collection(db, "researches");

// 🔹 Create
export const addResearch = async (research) => {
  try {
    const docRef = await addDoc(researchCollection, research);
    console.log("Document written: ", docRef);
  } catch (error) {
    console.error("Error create research:", error);
    throw error;
  }
};
