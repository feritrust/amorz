import axios from "axios";

const BASE_URL = "http://88.99.55.86:3000/";

/**
 * Fetch user details.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} API response
 */
export const getUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}users/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token as Bearer
      },
    });
    return response.data.data; // Ensure data is returned from API
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw error; // Propagate error to handle it in the calling function
  }
};