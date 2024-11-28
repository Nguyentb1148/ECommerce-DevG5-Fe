import authApi  from "../AxiosConfig";

const userData= async (userId)=>{
    try{
        const  response= await authApi.get(`/user/${userId}`)
        console.log('userId',response)
        return response;
    }
    catch(error){
        console.error('Error:', error);
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        // Sending GET request to retrieve all users
        const response = await authApi.get('/users');
        console.log('All users:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error; // Re-throw the error to be handled elsewhere
    }
};

const getUserById = async (userId) => {
    try {
        // Sending GET request to retrieve user data by userId
        const response = await authApi.get(`/users/${userId}`);
        console.log('User data by ID:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
        throw error; // Re-throw the error to be handled elsewhere
    }
};

const updateUserProfile = async (userId, updatedData) => {
    try {
        // Sending PUT request to update the user profile
        const response = await authApi.put(`/users/${userId}`, updatedData);
        console.log('Profile updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error; // Re-throw the error to be handled elsewhere
    }
};

const deleteUser = async (userId) => {
    try {
        // Sending DELETE request to remove a user by userId
        const response = await authApi.delete(`/users/${userId}`);
        console.log('User deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Re-throw the error to be handled elsewhere
    }
};
export  {userData, getAllUsers, getUserById, deleteUser, updateUserProfile} ;