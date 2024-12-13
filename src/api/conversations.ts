import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient, { axiosError } from './_client';
import {
  ConversationIdListResponse,
  ConversationDetailsResponse,
  PostConversationRequest,
  PostConversationResponse,
} from '../types/api';

export const postConversation = async (data: PostConversationRequest): Promise<PostConversationResponse> => {
  try {
    const response = await apiClient.post<PostConversationResponse>('/conversations', { data });
    return response.data;
  } catch (error) {
    const errorMessage = axiosError(error) as string; // 타입 캐스팅 추가
    console.error('API 요청 중 에러:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const usePostConversation = () => {
  const queryClient = useQueryClient();

  const handlePostConversation = async (data: PostConversationRequest): Promise<PostConversationResponse> => {
    try {
      const response = await postConversation(data);
      queryClient.invalidateQueries({ queryKey: ['conversationIdList'] });
      return response;
    } catch (error) {
      const errorMessage = axiosError(error) as string; // 타입 캐스팅 추가
      console.error('POST 요청 중 에러 발생:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { handlePostConversation };
};

export const useConversationIdList = () => {
  return useQuery({
    queryKey: ['conversationIdList'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<ConversationIdListResponse>('/conversations/id-list');
        return response.data;
      } catch (error) {
        const errorMessage = axiosError(error) as string; // 타입 캐스팅 추가
        console.error('대화 목록을 가져오는 중 에러 발생:', errorMessage);
        return { list: [] };
      }
    },
    staleTime: 1000 * 60 * 10, // 10분 동안 데이터 캐시 유지
  });
};

export const useConversationDetails = (conversation_id: number) => {
  return useQuery({
    queryKey: ['conversationDetails', conversation_id],
    queryFn: async () => {
      if (conversation_id === -1) {
        return { pairing: [] };
      }
      try {
        const response = await apiClient.get<ConversationDetailsResponse>(`/conversations/${conversation_id}`);
        return response.data;
      } catch (error) {
        const errorMessage = axiosError(error) as string; // 타입 캐스팅 추가
        console.error('대화 상세 내용을 가져오는 중 에러 발생:', errorMessage);
        return { pairing: [] };
      }
    },
    enabled: !!conversation_id,
  });
};
