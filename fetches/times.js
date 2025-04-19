import axiosInstance from "@/utils/axiosInstance";

export const fetchTimes = async () => {
  const response = await axiosInstance.get(`/times`);
  return response.data.data;
};
