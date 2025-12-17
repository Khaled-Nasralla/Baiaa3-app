// hooks/fetch-user-products.ts
import { GetProductsByUserId } from "@/api/api-prodcuts";
import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { useEffect, useState } from "react";

export function useFetchUserProducts(userId?: string) {
  const [products, setProducts] = useState<ProductPreviewDto[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchProducts = async () => {
      const products = await GetProductsByUserId(userId);
      setProducts(products);
    };

    fetchProducts();
  }, [userId]);

  return { products };
}
