import authApi from "../AxiosConfig.jsx";

// Create a new branch
export const createBranch = async (branchData) => {
    try {
        const response = await authApi.post("/branches", branchData);
        return response.data;
    } catch (error) {
        console.error("Error creating branch:", error);
        throw new Error(error.response?.data?.message || "Failed to create branch.");
    }
};

// Get all branches
export const getBranches = async () => {
    try {
        const response = await authApi.get("/branches");
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch branches.");
    }
};

// Get a single branch by ID
export const getBranchById = async (id) => {
    try {
        const response = await authApi.get(`/branches/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching branch by ID:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch branch.");
    }
};

// Update a branch by ID
export const updateBranch = async (id, branchData) => {
    try {
        const response = await authApi.put(`/branches/${id}`, branchData);
        return response.data;
    } catch (error) {
        console.error("Error updating branch:", error);
        throw new Error(error.response?.data?.message || "Failed to update branch.");
    }
};

// Delete a branch by ID
export const deleteBranch = async (id) => {
    try {
        const response = await authApi.delete(`/branches/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting branch:", error);
        throw new Error(error.response?.data?.message || "Failed to delete branch.");
    }
};
