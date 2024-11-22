import authApi from "../AxiosConfig.jsx";

// Create a product
export const createProduct = async (productData) => {
    try {
        const response = await authApi.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(error.response?.data?.message || "Failed to create product.");
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const response = await authApi.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch products.");
    }
};

// Get a single product by ID
export const getProductById = async (id) => {
    try {
        const response = await authApi.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch product.");
    }
};

// Update a product
export const updateProduct = async (id, productData) => {
    try {
        const response = await authApi.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(error.response?.data?.message || "Failed to update product.");
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const response = await authApi.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        throw new Error(error.response?.data?.message || "Failed to delete product.");
    }
};

