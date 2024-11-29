import axios from 'axios';
import Cookies from 'js-cookie';  // To get refresh token from cookies

const baseLink = 'https://project-2-back-end.onrender.com/api';

// Create an Axios instance
const authApi = axios.create({
    baseURL: baseLink,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is attached for authorization
    }
});

// Interceptor to always attach the access token in request headers
authApi.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        console.log('---->',accessToken);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor to handle expired access token and refresh it
authApi.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token (401 Unauthorized)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');  // Get the refresh token from cookies
                if (!refreshToken) {
                    throw new Error('No refresh token available.');
                }
                console.log('Using Refresh Token:', refreshToken);

                // Request a new access token using the refresh token
                const { data } = await axios.post(`${baseLink}/refresh-token`, { refreshToken });

                // Log and store the new access token
                console.log('New Access Token:', data.accessToken);
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));

                // Update the original request's authorization header with the new token
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // Retry the original request with the new access token
                return authApi(originalRequest);
            } catch (err) {
                console.error('Failed to Refresh Token:', err);
                // Redirect to login page if refreshing the token fails
                window.location.href = '/login';
            }
        }

        // Return the error if it's not a 401 or if the refresh token process fails
        return Promise.reject(error);
    }
);

export default authApi;
