import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient, { axiosError } from './_client';
import {
  ConversationIdListResponse,
  ConversationDetailsResponse,
  PostConversationRequest,
  PostConversationResponse,
} from '../types/api';

export const postConversation = async (data: PostConversationRequest) => {
  try {
    // console.log('API 요청 시작:', data);
    const response = await apiClient.post<PostConversationResponse>('/conversations', { data });
    // console.log('API 응답:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = axiosError(error);
    if (errorMessage === 'Resource not found') {
      console.warn('No conversations found. Returning default value.');
      return [];
    }
    console.error('API 요청 중 에러:', errorMessage);
    throw axiosError(error);
  }
};

export const usePostConversation = () => {
  const queryClient = useQueryClient();

  const handlePostConversation = async (data: PostConversationRequest) => {
    try {
      const response = await postConversation(data);

      queryClient.invalidateQueries({ queryKey: ['conversationIdList'] });
      if (data.conversation_id) {
        queryClient.invalidateQueries({ queryKey: ['conversationDetails', data.conversation_id] });
      }

      return response;
    } catch (error) {
      console.error('POST 요청 중 에러 발생:', error);
    }
  };

  return { handlePostConversation };
};

// GET /conversations/id-list - 대화 ID 목록 가져오기
export const useConversationIdList = () => {
  return useQuery({
    queryKey: ['conversationIdList'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<ConversationIdListResponse>('/conversations/id-list');
        if (response.data.list.length === 0) {
          // console.warn('대화 목록이 비어 있습니다.');
        }
        return response.data;
      } catch (error) {
        const errorMessage = axiosError(error);
        if (errorMessage === 'Resource not found') {
          console.log('대화 목록이 비어 있습니다.');
          return { list: [] };
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10, // 10분 동안 데이터 캐시 유지
  });
};

// GET /conversations/{conversation_id} - 특정 대화의 상세 내용 가져오기
export const useConversationDetails = (conversation_id: number) => {
  return useQuery({
    queryKey: ['conversationDetails', conversation_id],
    queryFn: async () => {
      try {
        if (conversation_id === -1) {
          // console.warn('Conversation ID가 -1입니다. 대화 상세 정보 없음.');
          return { pairing: [] };
        }

        const response = await apiClient.get<ConversationDetailsResponse>(`/conversations/${conversation_id}`);
        return response.data;
      } catch (error) {
        const errorMessage = axiosError(error);
        if (errorMessage === 'Resource not found') {
          // console.warn(`대화 상세 내용이 없습니다. Conversation ID: ${conversation_id}`);
          return { pairing: [] };
        }
        throw error;
      }
    },
    enabled: !!conversation_id,
  });
};
