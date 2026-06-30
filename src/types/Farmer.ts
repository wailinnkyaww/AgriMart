import type { User } from "./User";

export interface Farmer extends User {
  farmName: string;
  farmLocation: string;
  farmSize: number; // Acres

  mainCrops: string[];

  farmingExperience: number; // Years

  bio: string;
}
