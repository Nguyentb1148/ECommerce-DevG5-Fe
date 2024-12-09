import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";

// Create a product
export const createProduct = async (productData) => {
  try {
    const response = await authApi.post("/products", productData);
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


// Get all products
export const getProducts = async () => {
  try {
    const response = await authApi.get("/products");
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

// Get all products by chunk
export const getProductsByChunk = async (skip, limit) => {
  try {
    const response = await authApi.get(`/productsbychunks?skip=${skip}&limit=${limit}`);
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



// Get all products by sellerId
export const getProductsByUserId = async (userId) => {
  try {
    const response = await authApi.get(`/products/seller/${userId}`);
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

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await authApi.get(`/products/${id}`);
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

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await authApi.patch(`/products/${id}`, productData);
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

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await authApi.delete(`/products/${id}`);
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

export const fetchVariantDetails = async (variantId) => {
  try {
    const response = await authApi.get(`/products/variant/${variantId}`);
    return response.data.variant; // Assuming the variant data is in response.data.variant
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.message || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};
// Approve product
export const ApproveProduct = async (productId) => {
  try {
    console.log(`Approving product with ID: ${productId}`);
    const response = await authApi.patch(`/products/verify/${productId}`, { status: "approved" });
    console.log("Approve response:", response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      console.error("Approval error response:", err.response.data);
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message);
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};
// Reject product
export const RejectProduct = async (productId, reason) => {
  try {
    console.log(`Rejecting product with ID: ${productId} and reason: ${reason}`);
    const response = await authApi.patch(`/products/verify/${productId}`, { status: "rejected", reason });
    console.log("Reject response:", response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      console.error("Rejection error response:", err.response.data);
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message);
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};
// Update request status (approve or reject)
export const UpdateRequest = async (id, result, feedback) => {
  try {
    console.log("Sending update request:", { id, result, feedback });
    const response = await authApi.put(`/requests/${id}`, { result, feedback });
    console.log("Update request response:", response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || 'Something went wrong!';
      console.error("Error response:", err.response.data);
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message);
      toast.error('Network error, please try again later.');
    }
    throw err;
  }
};

