import { toast } from "react-toastify";
import authApi from "../AxiosConfig.jsx";
import { tryCatch } from "mammoth/mammoth.browser.js";

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
export const getProducts = async () => {
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

// Get all products by chunk
export const getProductsByChunk = async (filters = {}, skip, limit) => {
  try {
    const queryParams = new URLSearchParams({
      skip,
      limit,
      ...(filters.category?.length
        ? { category: filters.category.join(",") }
        : {}),
      ...(filters.brand?.length ? { brand: filters.brand.join(",") } : {}),
      ...(filters.price?.length === 2
        ? { price: filters.price.join(",") }
        : {}),
      ...(filters.keyword ? { keyword: filters.keyword.trim() } : {}),
    });

    const response = await authApi.get(
      `/productsbychunks?${queryParams.toString()}`
    );

    return response.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.error ||
      "Something went wrong while fetching products!";
    toast.error(errorMessage);
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

export const fetchVariantDetails = async (variantId) => {
  try {
    const response = await authApi.get(`/products/variant/${variantId}`);
    return response.data.variant;
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
    const response = await authApi.patch(`/products/verify/${productId}`, {
      status: "approved",
    });
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
export const RejectProduct = async (productId, feedback) => {
  try {
    const payload = { status: "rejected", feedback };
    console.log(
      `Rejecting product with ID: ${productId} and payload:`,
      payload
    );
    const response = await authApi.patch(
      `/products/verify/${productId}`,
      payload
    );
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

export const getAllRequest = async () => {
  try {
    const response = await authApi.get("/requests", {
      params: { type: "product" },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// Approve request
export const approveRequest = async (requestId) => {
  try {
    console.log(`Approving request with ID: ${requestId}`);
    const response = await authApi.put(`/requests/${requestId}`, {
      result: "approved",
      feedback: "Request approved successfully",
    });
    console.log("Approve request response:", response.data);
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

// Reject request
export const rejectRequest = async (requestId, feedback) => {
  try {
    console.log(
      `Rejecting request with ID: ${requestId} and feedback: ${feedback}`
    );
    const response = await authApi.put(`/requests/${requestId}`, {
      result: "rejected",
      feedback,
    });
    console.log("Reject request response:", response.data);
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
      const errorMessage = err.response.data.error || "Something went wrong!";
      console.error("Error response:", err.response.data);
      toast.error(errorMessage);
    } else {
      console.error("Network error:", err.message);
      toast.error("Network error, please try again later.");
    }
    throw err;
  }
};
