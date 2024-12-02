import { toast } from "react-toastify";
import authApi from "../AxiosConfig";

const login = async (credentials) => {
  try {
    const response = await authApi.post("/auth/signin", credentials);
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

const register = async (userData) => {
  try {
    const response = await authApi.post("/auth/signup", userData);
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await authApi.post("/users/forgot-password", { email });
    console.log("Please check your email");
    return response.data; // Return the full response, not just response.data
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};

const resetPassword = async (token, password) => {
  try {
    console.log("Reset password with token:", token, "and password:", password);
    const response = await authApi.post("/users/reset-password", {
      token,
      newPassword: password,
    }); // Send token and newPassword
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};

export { login, register, forgotPassword, resetPassword };
