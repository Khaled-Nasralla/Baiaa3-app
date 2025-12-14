import { GetProvince } from "@/api/api-prodcuts";
import { Province } from "@/entities/province";
import { useEffect, useState } from "react";

export function useFetchProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);


  useEffect(() => {
    const fetchProvinces = async () => {
      
        const data = await GetProvince(); // API call
        setProvinces(data);
  
   
    };

    fetchProvinces();
  }, []); // ✅ run once

  return { provinces };
}
