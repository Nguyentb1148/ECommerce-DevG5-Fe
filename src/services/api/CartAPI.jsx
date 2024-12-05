/* eslint-disable react-refresh/only-export-components */
import authApi from "../AxiosConfig.jsx";

// Create a new cart

export const AddToCart = async (cartData) => {
  try {
    const response = await authApi.post("/cart/add", cartData);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const GetCarts = async (cartData) => {
  try {
    const response = await authApi.get("/cart", cartData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting to cart:", error);
    throw error;
  }
};

// Update the quantity of a product in the cart
export const UpdateCart = async (cartData) => {
  try {
    const response = await authApi.patch("/cart/update", cartData);
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

// Remove a product from the cart
export const RemoveFromCart = async (productId, variantId) => {
  try {
    console.log("params will be removed", productId, variantId);
    const response = await authApi.delete("/cart/remove", {
      params: { productId, variantId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Clear the user's cart
export const ClearCart = async () => {
  try {
    const response = await authApi.delete("/cart/clear");
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
