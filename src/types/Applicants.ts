export interface Applicant {
  userId: string;
  name: string;
  role: "Farmer";
  status: "Pending" | "Accepted" | "Rejected";
  appliedAt: string;
}
