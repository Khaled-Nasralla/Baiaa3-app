import { Category } from "@/entities/category";
import { Product } from "@/entities/prodcut";
import { Province } from "@/entities/province";
import { api } from "./api";


export function AddProduct({product}:{product:Product}){
    return api.post("/product/add", {
     product
    });
}

export async function GetProducts():Promise<Product[]>{
    const response = await api.get("prodcuts")
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
