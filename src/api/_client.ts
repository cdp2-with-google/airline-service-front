import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Error 처리 함수
export const axiosError = (error: unknown) => {
  // 에러가 AxiosError인지 확인
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError;

    if (axiosErr.response) {
      // 서버가 응답했지만, 에러가 발생한 경우
      console.error('Response error:', axiosErr.response.data);
      return axiosErr.response.data;
    } else if (axiosErr.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      console.error('No response received:', axiosErr.request);
      return 'No response from server';
    } else {
      // 요청을 설정하는 동안 에러가 발생한 경우
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
