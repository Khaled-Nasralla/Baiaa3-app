import { Province } from "./province";

export interface Product {
    productId: string;
    userId: string;

    productName: string;

    provinceId: string;
    province: Province;

    price: string;
    description: string;
    contact: string;

    categoryId: string;

    createdAt: string;

   imageList: {
    id: string;
    imageUrl: string;
  }[];

    addressDescription: string;
}
