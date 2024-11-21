
// Create a category
import authApi from "../AxiosConfig.jsx";

export const createCategory = async (categoryData) => {
    try {
        const response = await authApi.post("/categories", categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error(error.response?.data?.message || "Failed to create category.");
    }
};

// Get all categories
export const getCategories = async () => {
    try {
        const response = await authApi.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch categories.");
    }
};

// Get a single category by ID
export const getCategoryById = async (id) => {
    try {
        const response = await authApi.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch category.");
    }
};

// Update category
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await authApi.put(`/categories/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw new Error(error.response?.data?.message || "Failed to update category.");
    }
};

// Delete category
export const deleteCategory = async (id) => {
    try {
        const response = await authApi.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error(error.response?.data?.message || "Failed to delete category.");
    }
};
