// Conversation ID 목록을 가져오는 API의 응답 타입
export type ConversationIdListResponse = {
  list: number[];
};

// 특정 대화의 상세 정보를 가져오는 API의 응답 타입
export type ConversationDetailsResponse = {
  title: string;
  engine: string;
  create_time: string; // DateTime 형식
  update_time: string; // DateTime 형식
  pairing: {
    id: number;
    request_message: string;
    response_message: string;
    create_time: string; // DateTime 형식
  }[];
};

// 새로운 대화를 생성하거나 기존 대화에 질문을 추가하는 요청 타입
export type PostConversationRequest = {
  conversation_id?: number | null; // 새로운 대화는 null, 기존 대화는 ID 입력해야함
  engine: string;
  question: string;
};

// 새로운 대화를 생성하거나 기존 대화에 질문을 추가한 응답 타입
export type PostConversationResponse = {
  data: {
    conversation_id: number;
    title: string;
    answer: string;
  };
};
