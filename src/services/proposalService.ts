import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "./../config/firebase";

export const getExistingProposal = async (
  contractId: string,
  postId: string,
) => {
  const proposalsRef = collection(db, "contractProposals");

  const q = query(
    proposalsRef,
    where("contractId", "==", contractId),
    where("postId", "==", postId),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const proposalDoc = snapshot.docs[0];

  return {
    id: proposalDoc.id,
    ...proposalDoc.data(),
  };
};

export const createContractProposal = async (data: any) => {
  const existingProposal = await getExistingProposal(
    data.contractId,
    data.postId,
  );

  if (existingProposal) {
    throw new Error("You have already sent this contract to this farmer post.");
  }

  await addDoc(collection(db, "contractProposals"), {
    ...data,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};
