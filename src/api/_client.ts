import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';
import { getToken, logout } from '../utils/token';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken } = getToken();
    if (accessToken) {
      config.headers.auth = accessToken;
      config.headers.refresh = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<never> => {
    if (error?.response?.status) {
      if (error?.response?.status === 401) {
        window.alert('로그인이 만료되었습니다.\n다시 로그인 해주세요.');
        logout();
      }

      if (error?.response?.status >= 500) {
        window.alert('알 수 없는 오류가 발생되었습니다.\n잠시 후 다시 이용바랍니다.');
      }
    }

    return Promise.reject(error);
  }
);

// Axios Error 처리
export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError;

    if (axiosErr.response) {
      if (axiosErr.response.status === 404) {
        // console.warn('Resource not found (404):', axiosErr.response.config.url);
        return 'Resource not found';
      }
      console.error('Response error:', axiosErr.response.data);

      return axiosErr.response.data;
    } else if (axiosErr.request) {
      console.error('No response received:', axiosErr.request);
      return 'No response from server';
    } else {
      console.error('Error setting up request:', axiosErr.message);
      return axiosErr.message;
    }
  } else {
    // AxiosError가 아닌 에러 처리
    console.error('Non-Axios error:', error);
    return 'Unknown error occurred';
  }
};

export default apiClient;
