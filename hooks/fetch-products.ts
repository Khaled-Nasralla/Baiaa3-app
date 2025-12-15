import { GetProducts } from "@/api/api-prodcuts";
import { Product } from "@/entities/product";
import { useEffect, useState } from "react";

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
     
    const fetchProducts = async () => { 
    
        const data = await GetProducts(); // API call
        setProducts(data);
    };

    fetchProducts();
  }, []); // ✅ run once

  return { products };
}
