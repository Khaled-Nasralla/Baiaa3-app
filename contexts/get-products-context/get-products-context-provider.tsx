import { GetProductDetails, GetProducts } from "@/api/api-prodcuts";
import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { Product } from "@/entities/product";
import { createContext, ReactNode, useContext, useState } from "react";
import { GetProductsType } from "./get-products.context-type";

const GetProductsContext = createContext<GetProductsType | undefined>(undefined);

export function GetProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductPreviewDto[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () =>  {
    try {
      setLoading(true);
      setError(null);
      const data = await GetProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await GetProductDetails(productId);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GetProductsContext.Provider
      value={{
        products,
        product,
        loading,
        error,
        fetchProducts,
        getProductDetails,
      }}
    >
      {children}
    </GetProductsContext.Provider>
  );
}

export function useGetProducts() {
  const context = useContext(GetProductsContext);
  if (!context) {
    throw new Error("useGetProducts must be used within GetProductsProvider");
  }
  return context;
}
