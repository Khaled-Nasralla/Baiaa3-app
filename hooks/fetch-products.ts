import { GetProducts } from "@/api/api-prodcuts";
import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { useEffect, useState } from "react";

export function useFetchProducts() {
  const [products, setProducts] = useState<ProductPreviewDto[]>([]);


  useEffect(() => {
     
    const fetchProducts = async () => { 
    
        const data = await GetProducts(); // API call
        setProducts(data);
    };

    fetchProducts();
  }, []); // ✅ run once

  return { products };
}
