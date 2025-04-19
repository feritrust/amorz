import { useQuery } from "@tanstack/react-query";
import { fetchUnavailableDates } from "@/fetches/unavailableDates";

export const useUnavailableDates = (fromDate, toDate, field) => {
  return useQuery({
    queryKey: ["unavailableDates", fromDate, toDate, field],
    queryFn: fetchUnavailableDates,
    enabled: !!field, // Only fetch if a field is selected
  });
};
