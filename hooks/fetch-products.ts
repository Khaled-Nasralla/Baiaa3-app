import { GetProducts } from "@/api/api-prodcuts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useFetchProducts() {


  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ["get-products"],
    queryFn: () => GetProducts(),
    staleTime: 1000 * 60 * 5,
  });

  useFocusEffect(
    useCallback(() => {
     
        queryClient.invalidateQueries({
          queryKey: ["get-products"]}
     ) }, [])
  );

  return { products };
}
