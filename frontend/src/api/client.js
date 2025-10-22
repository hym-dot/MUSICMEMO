// src/api/client.js
import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Axios 요청 인터셉터 (Request Interceptor)
client.interceptors.request.use(
    (config) => {
        // localStorage에서 사용자 정보(토큰 포함)를 가져옵니다.
        const userString = localStorage.getItem('musicmemo_user');

        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.token) {
                // config.headers에 Authorization 헤더를 추가합니다.
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;