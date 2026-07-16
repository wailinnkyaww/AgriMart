import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";
import type { Harvest } from "../types/Harvest";

const harvestRef = collection(db, "harvests");

/**
 * Create Harvest
 */
export const createHarvest = async (harvest: Omit<Harvest, "id">) => {
  await addDoc(harvestRef, harvest);
};

/**
 * Get All Harvests
 */
export const getHarvests = async (): Promise<Harvest[]> => {
  const snapshot = await getDocs(query(harvestRef));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Harvest, "id">),
  }));
};

/**
 * Update Harvest
 */
export const updateHarvest = async (
  harvestId: string,
  data: Partial<Harvest>,
) => {
  await updateDoc(doc(db, "harvests", harvestId), {
    ...data,
  });
};

/**
 * Delete Harvest
 */
export const deleteHarvest = async (harvestId: string) => {
  await deleteDoc(doc(db, "harvests", harvestId));
};
