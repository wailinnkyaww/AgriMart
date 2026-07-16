import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Contract } from "../types/Contract";

export const getContracts = async (): Promise<Contract[]> => {
  const q = query(collection(db, "contracts"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Contract[];
};

export const getContractCount = async (): Promise<number> => {
  const snapshot = await getDocs(collection(db, "contracts"));

  return snapshot.size;
};

export const getCompletedContractCount = async (): Promise<number> => {
  const q = query(
    collection(db, "contracts"),
    where("status", "==", "Completed"),
  );

  const snapshot = await getDocs(q);

  return snapshot.size;
};
