import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

// Create a review
export const createReview = async (reviewData) => {
  try {
    const response = await authApi.post("/reviews", reviewData, { headers });
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

// Get reviews by product ID
export const getProductReviews = async (productId) => {
  try {
    const response = await authApi.get(`/reviews/${productId}`, {
      headers: { Authorization: headers.Authorization },
    });
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

// Update a review
export const updateReview = async (id, reviewData) => {
  try {
    const response = await authApi.put(`/reviews/${id}`, reviewData, {
      headers,
    });
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

// Delete a review
export const deleteReview = async (id) => {
  try {
    const response = await authApi.delete(`/reviews/${id}`, {
      headers: { Authorization: headers.Authorization },
    });
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
