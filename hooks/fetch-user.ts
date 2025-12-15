// hooks/fetch-user-products.ts

import { GetUserById } from "@/api/api-users";
import { User } from "@/entities/user";
import { useEffect, useState } from "react";

export function useFetchUser(userId?: string) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const user = await GetUserById(userId);
      setUser(user);
    
    };

    fetchUser();
  }, [userId]);

  return { user };
}
