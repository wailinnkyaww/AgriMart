export interface Payment {
  id: string;

  contractId: string;

  contractTitle: string;

  buyerId: string;
  buyerName: string;

  farmerId: string;
  farmerName: string;

  amount: number;

  paymentMethod: string;

  status: "Pending" | "Paid" | "Cancelled";

  createdAt: string;

  paidAt?: string;
}
