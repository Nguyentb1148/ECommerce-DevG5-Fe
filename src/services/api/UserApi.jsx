import authApi from "../AxiosConfig";
import api from "./api";

export const userData = async (userId) => {
  try {
    const response = await authApi.get(`/user/${userId}`);
    console.log("userId", response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await authApi.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const BanUser = async (credentials) => {
  try {
    console.log("admin request...");
    const response = await authApi.post("/admin/ban-user", credentials);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const UpdateUserRole = async (credentials) => {
  try {
    console.log("admin request...");
    const response = await authApi.put("/admin/update-user-role", credentials);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const UpdateUserInfo = async (credentials) => {
  try {
    const response = await authApi.patch(`/admin/update-user`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};


