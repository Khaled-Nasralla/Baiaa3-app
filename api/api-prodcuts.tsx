import { Category } from "@/entities/category";
import { Product } from "@/entities/product";
import { Province } from "@/entities/province";
import { api } from "./api";


export async function AddProduct({formData} : {formData:FormData}){
  await api.post("/product/add", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
}

export async function GetProducts():Promise<Product[]>{
    const response = await api.get("/product/products")
    return response.data.data;
}

export async function GetProductDetails(productId:string):Promise<Product> {
   const response = await api.get(`/product/details/${productId}`)
   return response.data.data;
}

export async function GetProductsByUserId(userId:string | undefined):Promise<Product[]> {
   const response = await api.get(`/product/products/${userId}`)
    return response.data.data;
}


export async function GetCategories(): Promise<Category[]> {
    const response = await api.get("/category/categories");
    return response.data.data;
}

export async function GetProvince():Promise<Province[]> {
      const response = await api.get("/province/provinces");
     return response.data.data;  
}






