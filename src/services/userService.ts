import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { User } from "../types/User";

/**
 * Create a new user profile
 */
export const createUserProfile = async (
  uid: string,
  userData: Partial<User>,
) => {
  try {
    const userRef = doc(db, "users", uid);

    await setDoc(userRef, {
      uid,
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data();
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
