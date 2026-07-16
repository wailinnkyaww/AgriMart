import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";
import type { Notification } from "../types/Notification";

const collectionRef = collection(db, "notifications");

export const createNotification = async (
  notification: Omit<Notification, "id">,
) => {
  await addDoc(collectionRef, notification);
};

export const getUserNotifications = async (userId: string) => {
  const q = query(collectionRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((item: any) => item.userId === userId);
};

export const markAsRead = async (id: string) => {
  await updateDoc(doc(db, "notifications", id), {
    isRead: true,
  });
};
