import axiosInstance from "@/utils/axiosInstance";

export const fetchCoaches = async (query) => {
  const response = await axiosInstance.get(`/users`, {
    params: {
      role: "coach",
      phoneNumber: query,
    },
  });
  return response.data.data;
};
