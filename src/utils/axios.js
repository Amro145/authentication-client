import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://authentication-seven-psi.vercel.app',
    withCredentials: true,
});

export const setupInterceptors = (store) => {
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // Dispatch logout action imported dynamically to avoid circular dependency
                const { logout } = await import('../store/api');
                store.dispatch(logout());
            }
            return Promise.reject(error);
        }
    );
};

export default api;
