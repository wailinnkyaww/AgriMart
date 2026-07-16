// export interface Contract {
//   id: string;
//   agreementId: string | null;
//   applicants: any[];
//   contractType: string;
//   crop: string;
//   deliveryDate: string;
//   description: string;
//   endDate: string;
//   location: string;
//   paymentMethod: string;
//   price: number;
//   quantity: number;
//   requirements: string;
//   selectedApplicant: string | null;
//   startDate: string;
//   status: string;
//   title: string;
//   createdAt: string;
//   updatedAt: string;
//   farmerId?: string;
//   farmer?: string;
//   image?: string;
// }

// import type { Applicant } from "./Applicants";

// export interface Contract {
//   id: string;

//   // Buyer Information
//   buyerId: string;
//   buyerName: string;

//   title: string;
//   contractType: string;
//   crop: string;

//   description: string;
//   requirements: string;

//   quantity: number;
//   price: number;
//   paymentMethod: string;

//   location: string;

//   startDate: string;
//   deliveryDate: string;
//   endDate: string;

//   status: "Open" | "In Progress" | "Completed" | "Cancelled";

//   applicants: Applicant[];
//   selectedApplicant: string | null;

//   agreementId: string | null;

//   image?: string;

//   createdAt: string;
//   updatedAt: string;
// }

export interface Applicant {
  userId: string;
  name: string;
  role: string;
  appliedAt: string;
  status?: string;
}

export interface Creator {
  uid: string;
  name: string;
  email: string;
  role: string;
}

export interface Contract {
  id: string;

  creator: Creator;

  applicants: Applicant[] | null;

  status: string;
  title: string;
  crop: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  deliveryDate: string;
  endDate: string;
  selectedApplicant: Applicant | null;
  agreementId: string | null;
  image?: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  requirements: string;
  paymentMethod: string;
  contractType: string;
}
