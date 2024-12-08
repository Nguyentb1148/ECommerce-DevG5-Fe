import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";

// Create a product
export const createProduct = async (productData) => {
  try {
    const response = await authApi.post("/products", productData);
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

// Get all products
export const getProducts = async (skip, limit) => {
  try {
    const response = await authApi.get(`/products?skip=${skip}&limit=${limit}`);
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

// Get all products by sellerId
export const getProductsByUserId = async (userId) => {
  try {
    const response = await authApi.get(`/products/seller/${userId}`);
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

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await authApi.get(`/products/${id}`);
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

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await authApi.patch(`/products/${id}`, productData);
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

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await authApi.delete(`/products/${id}`);
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

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await authApi.get(`/products/category/${categoryId}`);
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

// Get all products
export const GetAllProducts = async () => {
  try {
    const response = await authApi.get("/products");
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
export const ApproveProduct = async (productId) => {
  try {
    const response = await authApi.put(`/products/${productId}/approve`);
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

// Reject product
export const RejectProduct = async (productId, reason) => {
  try {
    const response = await authApi.post(`/products/${productId}/reject`, { reason });
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

// Update request status (approve or reject)
export const UpdateRequest = async (id, result, feedback) => {
  try {
    console.log("Sending update request:", { id, result, feedback }); // Log the request data
    const response = await authApi.put(`/requests/${id}`, { result, feedback });
    console.log("Update request response:", response.data); // Log the response data
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || 'Something went wrong!';
      console.error("Error response:", err.response.data); // Log the error response
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message); // Log the network error
      toast.error('Network error, please try again later.');
    }
    throw err;
  }
};

// Unreject product
export const UnrejectProduct = async (productId) => {
  try {
    console.log("Sending unreject request for product ID:", productId); // Log the request data
    const response = await authApi.post(`/products/${productId}/unreject`);
    console.log("Unreject product response:", response.data); // Log the response data
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data.error || "Something went wrong!";
      console.error("Error response:", err.response.data); // Log the error response
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message); // Log the network error
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};

// Fetch variant details
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