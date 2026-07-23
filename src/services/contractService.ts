import {
  collection,
  getDocs,
  query,
  doc,
  orderBy,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Contract } from "../types/Contract";

export const completeContract = async (contractId: string): Promise<void> => {
  try {
    const contractRef = doc(db, "contracts", contractId);

    await updateDoc(contractRef, {
      status: "Completed",
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error completing contract:", error);
    throw error;
  }
};

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

export const acceptContractProposal = async (
  contractId: string,
  farmerId: string,
) => {
  const contractRef = doc(db, "contracts", contractId);

  await updateDoc(contractRef, {
    selectedApplicant: farmerId,
    status: "Assigned",
    updatedAt: new Date().toISOString(),
  });
};

export const rejectContractProposal = async (contractId: string) => {
  const contractRef = doc(db, "contracts", contractId);

  await updateDoc(contractRef, {
    status: "Rejected",
    updatedAt: new Date().toISOString(),
  });
};
