import { useQuery } from "@tanstack/react-query";
import { fetchCoaches } from "@/fetches/coaches";

export const useCoaches = (query) => {
  return useQuery({
    queryKey: ["coaches", query],
    queryFn: () => fetchCoaches(query),
    enabled: !!query, // Only fetch if query is not empty
  });
};
