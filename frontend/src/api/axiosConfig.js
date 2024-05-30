import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
