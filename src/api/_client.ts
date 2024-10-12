import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Error 처리 함수
export const axiosError = (error: AxiosError) => {
  if (error.response) {
    // 서버가 응답했지만, 에러
    console.error('Response error:', error.response.data);
    return error.response.data;
  } else if (error.request) {
    // 요청이 전송되었지만, 응답이 없음
    console.error('No response received:', error.request);
    return 'No response from server';
  } else {
    // 요청을 설정하는 동안 에러 발생
    console.error('Error setting up request:', error.message);
    return error.message;
  }
};

export default apiClient;
