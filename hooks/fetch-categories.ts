import { GetCategories } from "@/api/api-prodcuts";
import { Category } from "@/entities/category";
import { useEffect, useState } from "react";

export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await GetCategories(); // API call
        setCategories(data);
  
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // ✅ run once

  return { categories, loading, error };
}
