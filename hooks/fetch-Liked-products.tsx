import { GetLikedProduects } from "@/api/api-fav";
import { ProductPreviewDto } from "@/dtos/product-preview-dto";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function useFetchLikedProducts(userId?: string) {
  const [likedProducts, setLikedProducts] =
    useState<ProductPreviewDto[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      const fetchLikedProducts = async () => {
        const data = await GetLikedProduects(userId);
        setLikedProducts(data);
      };

      fetchLikedProducts();
    }, [userId])
  );

  return { likedProducts };
}
