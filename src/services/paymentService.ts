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
import type { Payment } from "../types/Payment";

const paymentRef = collection(db, "payments");

//check payment exists
export const paymentExists = async (contractId: string): Promise<boolean> => {
  const q = query(
    collection(db, "payments"),
    where("contractId", "==", contractId),
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
};

// Create payment
export const createPayment = async (payment: Omit<Payment, "id">) => {
  await addDoc(paymentRef, payment);
};

// Get all payments
export const getPayments = async (): Promise<Payment[]> => {
  const snapshot = await getDocs(query(paymentRef));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Payment, "id">),
  }));
};

//get payment by contract id
export const getPaymentByContract = async (contractId: string) => {
  const q = query(
    collection(db, "payments"),
    where("contractId", "==", contractId),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
};

// Mark payment as paid
export const markPaymentPaid = async (paymentId: string) => {
  await updateDoc(doc(db, "payments", paymentId), {
    status: "Paid",
    paidAt: new Date().toISOString(),
  });
};
