export interface Notification {
  id: string;

  userId: string;

  title: string;

  message: string;

  type: "Application" | "Contract" | "Payment" | "System";

  isRead: boolean;

  createdAt: string;
}
