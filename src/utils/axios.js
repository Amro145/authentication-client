import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://authentication-seven-psi.vercel.app',
    withCredentials: true,
});

export default api;
