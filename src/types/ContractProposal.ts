export interface ContractProposal {
  id: string;

  contractId: string;
  postId: string;

  buyerId: string;
  buyerName: string;

  farmerId: string;
  farmerName: string;

  status: "Pending" | "Accepted" | "Rejected";

  createdAt: string;
  updatedAt?: string;
}
