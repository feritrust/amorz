import axios from "axios";

const BASE_URL = "http://88.99.55.86:3000/auth";

/**
 * Generate OTP for a given phone number.
 * @param {string} phoneNumber - The user's phone number.
 * @returns {Promise} API response
 */
export const generateOtp = async (phoneNumber) => {
  const response = await axios.post(`${BASE_URL}/otp-generate`, { phoneNumber });
  return response.data; // Ensure data is returned from API
};

/**
 * Confirm OTP with phone number.
 * @param {string} phoneNumber - The user's phone number.
 * @param {string} otpCode - The OTP code received.
 * @returns {Promise} API response
 */
export const confirmOtp = async ({ phoneNumber, otpCode }) => {
  try {
    const response = await axios.post(`${BASE_URL}/otp-confirm`, { phoneNumber, otpCode });
    return response.data; // Ensure data is returned from API
  } catch (error) {
    console.error("Error confirming OTP:", error.response?.data || error.message);
    throw error; // Propagate error to mutation onError callback
  }
};
