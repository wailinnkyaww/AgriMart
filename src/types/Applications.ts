export interface Application {
  id?: string;
  contractId: string;
  contractOwnerId: string;
  applicantId: string;
  applicantName: string;
  applicantRole: "buyer" | "farmer";
  status: "pending" | "accepted" | "rejected";
  createdAt: any;
}
