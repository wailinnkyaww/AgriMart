export interface Harvest {
  id: string;

  contractId: string;

  farmerId: string;
  farmerName: string;

  crop: string;

  quantity: number;

  harvestDate: string;

  quality: string;

  notes: string;

  image?: string;

  status: "Submitted";

  createdAt: string;
}
