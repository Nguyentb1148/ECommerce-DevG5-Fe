import authApi from "../AxiosConfig.jsx";

// Create a new brand
export const createBrand = async (branchData) => {
    try {
        const response = await authApi.post("/brands", branchData);
        return response.data;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw new Error(error.response?.data?.message || "Failed to create brand.");
    }
};

// Get all brands
export const getBrands = async () => {
    try {
        const response = await authApi.get("/brands");
        return response.data;
    } catch (error) {
        console.error("Error fetching brand:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch brands.");
    }
};

// Get a single brand by ID
export const getBrandById = async (id) => {
    try {
        const response = await authApi.get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching brand by ID:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch brand.");
    }
};

// Update a brand by ID
export const updateBrand = async (id, branchData) => {
    try {
        const response = await authApi.put(`/brands/${id}`, branchData);
        return response.data;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw new Error(error.response?.data?.message || "Failed to update brand.");
    }
};

// Delete a brand by ID
export const deleteBrand = async (id) => {
    try {
        const response = await authApi.delete(`/brands/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting brand:", error);
        throw new Error(error.response?.data?.message || "Failed to delete brand.");
    }
};
