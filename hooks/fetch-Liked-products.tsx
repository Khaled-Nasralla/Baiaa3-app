import { GetLikedProduects as GetLikedProducts } from "@/api/api-fav";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useFetchLikedProducts(userId?: string) {

const queryClient = useQueryClient();

  const likedProducts = useQuery({
    queryKey: ["liked-products", userId],
    queryFn: () => GetLikedProducts(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });


  useFocusEffect(
    useCallback(() => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["liked-products", userId],
        });
      }
    }, [userId])
  );

  return {likedProducts};
}
