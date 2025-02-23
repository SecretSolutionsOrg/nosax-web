import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  // getDocs,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

// Collection Reference
const researchCollection = collection(db, "researches");

// 🔹 Create (Add Research)
export const addResearch = async (research) => {
  try {
    const docRef = await addDoc(researchCollection, research);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding research:", error);
    throw error;
  }
};

// // 🔹 Read (Get All Researches)
// export const getResearches = async () => {
//   const snapshot = await getDocs(researchCollection);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// // 🔹 Update (Edit Research)
// export const updateResearches = async (id, updatedData) => {
//   const researchDoc = doc(db, "researches", id);
//   await updateDoc(researchDoc, updatedData);
// };

// // 🔹 Delete (Remove Research)
// export const deleteResearch = async (id) => {
//   const researchDoc = doc(db, "users", id);
//   await deleteDoc(researchDoc);
// };
