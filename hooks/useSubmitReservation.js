import { useMutation } from "@tanstack/react-query";
import { submitReservation } from "@/fetches/reservation";

export const useSubmitReservation = (token) => {
  return useMutation({
    mutationFn: (reservationData) => submitReservation(reservationData, token),
    onSuccess: () => {
      alert("Selections submitted successfully!");
    },
    onError: (err) => {
      console.error(err);
      alert("Failed to submit selections. Please try again.");
    },
  });
};
