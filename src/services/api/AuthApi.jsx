import authApi from "../AxiosConfig";


const login = async (credentials) => {
    try {
        console.log("Sending login request...");
        const response = await authApi.post('/auth/signin', credentials);
        console.log("Response received:", response.data);
        console.log('User logged in successfully.');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


const register = async (userData) => {
    try {
        console.log("Register data", userData);
        const response = await authApi.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const forgotPassword = async (email) => {
    try {
        console.log("Forgot password email: ", email);
        const response = await authApi.post('/user/forgot-password', { email }); // Wrap email in an object
        return response; // Return the full response, not just response.data
    } catch (error) {
        console.error('Error in forgot password API:', error);
        throw error;
    }
};

const resetPassword = async (token, password) => {
    try {
        console.log("Reset password with token:", token, "and password:", password);
        const response = await authApi.post('/user/reset-password', { token, newPassword: password }); // Send token and newPassword
        return response.data;
    } catch (error) {
        console.error('Error in reset password API:', error);
        throw error;
    }
};


export  {login,register, forgotPassword, resetPassword};