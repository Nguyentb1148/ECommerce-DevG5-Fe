import authApi from "../AxiosConfig";

// Retrieve the user's cart
export const getCart = async () => {
  try {
    const response = await api.get("/cart/");
    return response.data;
  } catch (error) {
    console.error("Error retrieving the cart:", error);
    throw new Error(error.response?.data?.message || "Failed to retrieve cart.");
  }
};

// Add or update a product in the cart
export const addToCart = async (productData) => {
  try {
    const response = await api.post("/cart/add", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating product in the cart:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add/update product in cart."
    );
  }
};

// Remove a product from the cart
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/remove`, { data: { productId } });
    return response.data;
  } catch (error) {
    console.error("Error removing product from the cart:", error);
    throw new Error(
      error.response?.data?.message || "Failed to remove product from cart."
    );
  }
};

// Update the quantity of a product in the cart
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.patch(`/cart/update`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update cart item quantity."
    );
  }
};

// Clear the entire cart
export const clearCart = async () => {
  try {
    const response = await api.delete("/cart/clear");
    return response.data;
  } catch (error) {
    console.error("Error clearing the cart:", error);
    throw new Error(error.response?.data?.message || "Failed to clear cart.");
  }
};
