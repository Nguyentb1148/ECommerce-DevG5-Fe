import authApi from "../AxiosConfig";

export const requestUserToSeller = async (dataToSend) => {
    try {
        const response = await authApi.post(`/requests`,dataToSend);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const requestStatus = async () => {
    try {
        const response = await authApi.get(`/requests/user`);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const getAllRequest = async () => {
    try {
        const response = await authApi.get('/requests', { params: { type: 'user' } })
        return response.data
    } catch (error) {
        toast.error(error.message)
    }
}
export const approveRequest = async (id) => {
    try {
        console.log("admin request...: ",id);
        const response = await authApi.put(`/requests/${id}/approve`);
        return response.data;
    } catch (error) {
        console.error("Error approving request:", error);
        throw error;
    }
};
export const rejectRequest = async (id,feedback) => {
    try {
        console.log("admin request...: ",id);
        const response = await authApi.put(`/requests/${id}/reject`,feedback);
        return response.data;
    } catch (error) {
        console.error("Error rejecting request:", error);
        throw error;
    }
};

