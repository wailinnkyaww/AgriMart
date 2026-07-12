import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Contract } from "../types/Contract";

/**
 * Accept one applicant.
 * - Selected applicant -> Accepted
 * - All other pending applicants -> Rejected
 * - Contract -> Assigned
 */
export const acceptApplicant = async (
  contract: Contract,
  applicantId: string,
) => {
  const selected = contract.applicants.find(
    (applicant) => applicant.userId === applicantId,
  );

  if (!selected) {
    throw new Error("Applicant not found.");
  }

  const updatedApplicants = contract.applicants.map((applicant) => ({
    ...applicant,
    status: applicant.userId === applicantId ? "Accepted" : "Rejected",
  }));

  await updateDoc(doc(db, "contracts", contract.id), {
    applicants: updatedApplicants,
    selectedApplicant: applicantId,
    status: "Assigned",
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Reject only one applicant.
 * Contract remains Open or Closed.
 */
export const rejectApplicant = async (
  contract: Contract,
  applicantId: string,
) => {
  const updatedApplicants = contract.applicants.map((applicant) =>
    applicant.userId === applicantId
      ? {
          ...applicant,
          status: "Rejected",
        }
      : applicant,
  );

  await updateDoc(doc(db, "contracts", contract.id), {
    applicants: updatedApplicants,
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Stop accepting new applications.
 */
export const closeApplications = async (contractId: string) => {
  await updateDoc(doc(db, "contracts", contractId), {
    status: "Closed",
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Reopen applications.
 */
export const openApplications = async (contractId: string) => {
  await updateDoc(doc(db, "contracts", contractId), {
    status: "Open",
    updatedAt: new Date().toISOString(),
  });
};
