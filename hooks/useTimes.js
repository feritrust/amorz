import { useQuery } from "@tanstack/react-query";
import { fetchTimes } from "@/fetches/times";

export const useTimes = () => {
  return useQuery({
    queryKey: ["times"],
    queryFn: fetchTimes,
  });
};
