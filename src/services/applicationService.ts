import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../config/firebase";

interface Applicant {
  userId: string;
  name: string;
  role: "Farmer" | "Buyer";
  status: "Pending";
  appliedAt: string;
}

export const applyContract = async (
  contractId: string,
  applicant: Applicant,
) => {
  const contractRef = doc(db, "contracts", contractId);

  await updateDoc(contractRef, {
    applicants: arrayUnion({
      userId: applicant.userId,
      name: applicant.name,
      role: applicant.role,
      status: "Pending",
      appliedAt: new Date().toISOString(),
    }),
  });
};
