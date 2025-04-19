import axiosInstance from "@/utils/axiosInstance";

export const submitReservation = async (reservationData, token) => {
  const response = await axiosInstance.post(`/reservations`, reservationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
