export interface Post {
  id: string;

  title: string;
  crop: string;
  quantity: number;
  location: string;
  expectedPrice: number;
  harvestDate: string;
  description: string;
  image: string;

  farmer: {
    uid: string;
    fullName: string;
    email: string;
    role: string;
  };

  status: "Available" | "Sold" | "Closed";

  createdAt: string;
  updatedAt: string;
}
