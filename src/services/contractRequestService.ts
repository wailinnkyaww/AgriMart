import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Contract } from "../types/Contract";
import { createNotification } from "./notificationService";

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
  await createNotification({
    userId: applicantId,
    title: "Application Accepted",
    message: `Congratulations! You have been accepted for "${contract.title}".`,
    type: "Contract",
    isRead: false,
    createdAt: new Date().toISOString(),
  });
  await createNotification({
    userId: applicantId,
    title: "Application Rejected",
    message: `Your application for "${contract.title}" was not selected.`,
    type: "Application",
    isRead: false,
    createdAt: new Date().toISOString(),
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
