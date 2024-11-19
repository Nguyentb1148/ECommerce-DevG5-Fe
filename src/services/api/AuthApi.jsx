import authApi from "../AxiosConfig";


const login = async (credentials) => {
    try {
        console.log("Sending login request...");
        const response = await authApi.post('/auth/signin', credentials);
        console.log("Response received:", response.data);
        //localStorage.setItem('role',response.data.role)
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
export  {login,register};