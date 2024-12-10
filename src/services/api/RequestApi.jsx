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
