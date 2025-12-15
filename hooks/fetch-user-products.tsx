// hooks/fetch-user-products.ts
import { GetProductsByUserId } from "@/api/api-prodcuts";
import { Product } from "@/entities/product";
import { useEffect, useState } from "react";

export function useFetchUserProducts(userId?: string) {
  const [products, setProducts] = useState<Product[]>([]);

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
