import { PostGoogleOAuthResponse } from '../types/api';

export const setToken = ({ accessToken, refreshToken }: PostGoogleOAuthResponse) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getToken = () => {
  return {
    accessToken: localStorage.getItem('accessToken')!,
    refreshToken: localStorage.getItem('refreshToken')!,
  };
};

export const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken');
};
