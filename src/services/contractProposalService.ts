import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";
import type { ContractProposal } from "../types/ContractProposal";

export const sendContractProposal = async (data: {
  contractId: string;
  postId: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  status: "Pending";
  createdAt: string;
}) => {
  // Check if the same contract was already
  // sent to the same farmer post

  const q = query(
    collection(db, "contractProposals"),
    where("contractId", "==", data.contractId),
    where("postId", "==", data.postId),
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("This contract has already been sent to this farmer post.");
  }

  // Create new proposal

  await addDoc(collection(db, "contractProposals"), {
    ...data,
    status: "Pending",
    updatedAt: new Date().toISOString(),
  });
};
export const getFarmerProposals = async (
  farmerId: string,
): Promise<ContractProposal[]> => {
  const q = query(
    collection(db, "contractProposals"),
    where("farmerId", "==", farmerId),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((proposalDoc) => ({
    id: proposalDoc.id,
    ...proposalDoc.data(),
  })) as ContractProposal[];
};
export const acceptContractProposal = async (
  proposalId: string,
  contractId: string,
  farmerId: string,
) => {
  // 1. Update original contract
  const contractRef = doc(db, "contracts", contractId);

  await updateDoc(contractRef, {
    selectedApplicant: farmerId,
    status: "Assigned",
    updatedAt: new Date().toISOString(),
  });

  // 2. Update proposal
  const proposalRef = doc(db, "contractProposals", proposalId);

  await updateDoc(proposalRef, {
    status: "Accepted",
    updatedAt: new Date().toISOString(),
  });
};
export const rejectContractProposal = async (proposalId: string) => {
  const proposalRef = doc(db, "contractProposals", proposalId);

  await updateDoc(proposalRef, {
    status: "Rejected",
    updatedAt: new Date().toISOString(),
  });
};
