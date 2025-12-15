import { Product } from "@/entities/product";

export interface GetProductsType{
    fetchProducts : ()=> Promise<void>
    getProductDetails: (productId : string)=> Promise<void>
    loading : boolean
    product : Product | null
    error : string | null
    products: Product[] | null
    
}