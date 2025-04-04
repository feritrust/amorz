import { getFields } from "@/fetches/fields";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch user details using React Query.
 * @param {string} token - The user's authentication token.
 * @returns {object} Query result containing user data, loading state, and error.
 */
export const useGetFields = () => {
  return useQuery({
    queryKey: ["fields"], // Query key
    queryFn: () => getFields(), // Query function
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 1, // Retry once on failure
  });
};