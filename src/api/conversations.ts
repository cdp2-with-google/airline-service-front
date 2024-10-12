// C:\HYUNWOO\react\airline-service - 작업용\airline-service-front\src\api\conversations.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient, { axiosError } from './_client';
import {
  ConversationIdListResponse,
  ConversationDetailsResponse,
  PostConversationRequest,
  PostConversationResponse,
} from '../types/api'; // 타입 정의 가져오기

// POST /conversations - useMutation을 사용하지 않고 직접 호출
export const postConversation = async (data: PostConversationRequest) => {
  try {
    console.log('API 요청 시작:', data); // 요청 전 로그
    const response = await apiClient.post<PostConversationResponse>('/conversations', { data });
    console.log('API 응답:', response.data); // 응답 로그
    return response.data; // 여기서 'data' 객체를 반환
  } catch (error) {
    console.error('API 요청 중 에러:', axiosError(error as any)); // 에러 로그
    throw axiosError(error as any); // 에러 처리
  }
};

// POST 요청 이후, 데이터를 갱신하는 예시 함수
export const usePostConversation = () => {
  const queryClient = useQueryClient();

  const handlePostConversation = async (data: PostConversationRequest) => {
    try {
      const response = await postConversation(data);

      // POST 이후에 GET 쿼리 데이터 갱신
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
