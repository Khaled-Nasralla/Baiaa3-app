import { Category } from "@/entities/category";
import { Product } from "@/entities/prodcut";
import { api } from "./api";


export function AddProduct({product}:{product:Product}){
    return api.post("add/product", {
     product
    });
}

export function GetProducts(){
    return api.get("get/prodcuts")
}


export async function GetCategories(): Promise<Category[]> {
    const response = await api.get("get/categories");
    return response.data;
}
