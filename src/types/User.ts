export type UserRole = "farmer" | "buyer";

export interface User {
  uid: string;

  // Basic Information
  fullName: string;
  email: string;
  phone: string;

  // Authentication
  role: UserRole;

  // Profile
  photoURL: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
