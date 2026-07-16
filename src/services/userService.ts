import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  collection,
  where,
  limit,
  getDocs,
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

export const getBuyers = async (): Promise<User[]> => {
  const q = query(
    collection(db, "users"),
    where("role", "==", "Buyer"),
    limit(6),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...(doc.data() as Omit<User, "uid">),
  }));
};

export const getUserCount = async (
  role: "Buyer" | "Farmer",
): Promise<number> => {
  const q = query(collection(db, "users"), where("role", "==", role));

  const snapshot = await getDocs(q);

  return snapshot.size;
};

export const getFarmers = async (): Promise<User[]> => {
  const q = query(
    collection(db, "users"),
    where("role", "==", "Farmer"),
    limit(4),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...(doc.data() as Omit<User, "uid">),
  }));
};
