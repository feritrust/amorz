import { useMutation } from "@tanstack/react-query";
import { generateOtp, confirmOtp } from "@/fetches/auth";

// Hook for generating OTP
export const useOtpGenerate = () => {
  return useMutation({
    mutationFn: async (phoneNumber) => {
      const response = await generateOtp(phoneNumber);
      return response;  // Return the data from the API response
    },
  });
};

// Hook for confirming OTP
export const useOtpConfirm = () => {
  return useMutation({
    mutationFn: async ({ phoneNumber, otpCode }) => {
      const response = await confirmOtp({ phoneNumber, otpCode });
      return response;  // Return the data from the API response
    },
  });
};
