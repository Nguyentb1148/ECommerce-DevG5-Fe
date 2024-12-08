import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";

const paymentApi = {
  createCheckoutSession: async (data) => {
    try {
      const response = await authApi.post("/payment/stripe-checkout", data);
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
      throw err;
    }
  },

  verifyPayment: async (sessionId) => {
    try {
      const response = await authApi.get(
        `/payment/stripe-success?session_id=${sessionId}`
      );
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
      throw err;
    }
  },
};

export default paymentApi;
