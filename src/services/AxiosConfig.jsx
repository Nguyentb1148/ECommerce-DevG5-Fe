import axios from 'axios';
import Cookies from 'js-cookie';  // To get refresh token from cookies

const baseLink = 'https://project-2-back-end.onrender.com/api';

// Create an Axios instance
const authApi = axios.create({
    baseURL: baseLink,
    headers: {
        'Content-Type': 'application/json',
    }
});

authApi.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
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

authApi.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available.');
                }
                console.log('Using Refresh Token');

                const { data } = await axios.post(`${baseLink}/refresh-token`, { refreshToken });

                console.log('New Access Token');
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));

                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                return authApi(originalRequest);
            } catch (err) {
                console.error('Failed to Refresh Token:', err);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default authApi;
