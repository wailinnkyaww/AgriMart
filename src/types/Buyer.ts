import type { User } from "./User";

export interface Buyer extends User {
  companyName: string;

  businessType: string;

  companyAddress: string;

  preferredCrops: string[];

  bio: string;
}
