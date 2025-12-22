// hooks/fetch-user-products.ts
import { GetProductsByUserId } from "@/api/api-prodcuts";
import { useSignInContext } from "@/contexts/sign-in-context/sign-in-context-provider";
import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { useEffect, useState } from "react";

export function useFetchUserProducts() {
  const [products, setProducts] = useState<ProductPreviewDto[]>([]);
  const { user } = useSignInContext();
  useEffect(() => {
    if (!user?.id) return;

    const fetchProducts = async () => {
      const products = await GetProductsByUserId(user?.id);
      setProducts(products);
    };

    fetchProducts();
  }, [user?.id]);

  return { products };
}
