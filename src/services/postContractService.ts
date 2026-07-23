import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../config/firebase";

export interface PostContractRequest {
  postId: string;

  farmerId: string;
  farmerName: string;

  contractId: string;

  buyerId: string;
  buyerName: string;
  buyerEmail: string;

  title: string;
  crop: string;
  quantity: number;
  price: number;

  status: "Pending" | "Accepted" | "Rejected";

  createdAt: string;
}

/**
 * Buyer sends an existing contract
 * to a farmer's post.
 */
export const sendContractToFarmer = async (data: PostContractRequest) => {
  try {
    const requestRef = await addDoc(
      collection(db, "postContractRequests"),
      data,
    );

    return {
      id: requestRef.id,
      ...data,
    };
  } catch (error) {
    console.error("Error sending contract to farmer:", error);

    throw error;
  }
};

/**
 * Get contract requests for a farmer.
 */
export const getFarmerContractRequests = async (farmerId: string) => {
  try {
    const q = query(
      collection(db, "postContractRequests"),
      where("farmerId", "==", farmerId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting farmer contract requests:", error);

    throw error;
  }
};
