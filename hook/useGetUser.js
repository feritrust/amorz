import { useQuery } from "@tanstack/react-query";
import { getUser } from "../fetches/user";

/**
 * Custom hook to fetch user details using React Query.
 * @param {string} token - The user's authentication token.
 * @returns {object} Query result containing user data, loading state, and error.
 */
export const useGetUser = (token) => {
  return useQuery({
    queryKey: ["user", token], // Query key
    queryFn: () => getUser(token), // Query function
    enabled: !!token, // Only run query if token exists
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 1, // Retry once on failure
  });
};