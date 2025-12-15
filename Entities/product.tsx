import { Province } from "./province";

export interface Product {
  productId: string;
  userId: string;

  productName: string;

  provinceId: string;
  province: Province; // optional (important)

  price: string;
  description: string;
  contact: string;

  categoryId: string;

  createdAt: string; // ISO date from backend

  imageList: {
    id: string;
    imageUrl: string;
  }[];

  addressDescription: string;
}
