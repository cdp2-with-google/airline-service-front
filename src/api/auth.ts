import apiClient from './_client';
import { PostGoogleOAuthResponse } from '../types/api';

export const postGoogleOAuth = async (socialToken: string) => {
  return apiClient.post<PostGoogleOAuthResponse>('/api/v1/oauth', { socialToken });
};
