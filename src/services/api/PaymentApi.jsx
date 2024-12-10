import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";

const paymentApi = {
  createStripeSession: async (data) => {
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

  verifyStripePayment: async (sessionId) => {
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

  // vn pay
  createVnPaySession: async (data) => {
    try {
      const response = await authApi.post("/payment/vnpay-checkout", data);
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

  verifyVnPayPayment: async (queryParams) => {
    try {
      // Pass all query parameters received from VNPay to the backend for verification
      const response = await authApi.get(`/payment/vnpay_success`, {
        params: queryParams,
      });
      console.log("vnpay on success", response);
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
