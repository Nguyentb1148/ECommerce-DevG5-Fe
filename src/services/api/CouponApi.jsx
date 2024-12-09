import { toast } from "react-toastify";
import authApi from "../AxiosConfig";

export const applyCoupon = async (couponCode) => {
  try {
    const response = await authApi.post(`/coupons/apply`, { couponCode });
    return response.data;
  } catch (err) {
    if (err.response) {
      // Server responded with an error
      const errorMessage = err.response.data.error || "Something went wrong!";
      toast.error(errorMessage); // Show error message using toast
    } else {
      // Network or other errors
      toast.error("Network error, please try again later.");
    }
    throw err; // Propagate error for further handling if necessary
  }
};

// Fetch available coupons (optional for display)
export const getCoupons = async () => {
  try {
    const response = await authApi.get(`/coupons`);
    return response.data;
  } catch (err) {
    if (err.response) {
      // Server responded with an error
      const errorMessage = err.response.data.error || "Something went wrong!";
      toast.error(errorMessage); // Show error message using toast
    } else {
      // Network or other errors
      toast.error("Network error, please try again later.");
    }
    throw err; // Propagate error for further handling if necessary
  }
};
