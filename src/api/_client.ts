import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Error 처리
export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError;

    if (axiosErr.response) {
      if (axiosErr.response.status === 404) {
        console.warn('Resource not found (404):', axiosErr.response.config.url);
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
