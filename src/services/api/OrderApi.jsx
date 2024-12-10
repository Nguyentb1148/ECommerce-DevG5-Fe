import authApi from "../AxiosConfig";

export const orderByUserId = async () => {
  try {
    const response = await authApi.get(`/orders/user`);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};