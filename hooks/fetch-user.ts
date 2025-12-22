// hooks/fetch-user-products.ts

import { GetUserById } from "@/api/api-users";
import { User } from "@/entities/user";
import { useEffect, useState } from "react";

export function useFetchUser(userId?: string) {
  const [productOwner, setUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const productOwner = await GetUserById(userId);
      setUser(productOwner);
    
    };

    fetchUser();
  }, [userId]);

  return { productOwner };
}
