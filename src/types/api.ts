//C:\HYUNWOO\react\airline-service(1128-2)\airline-service-front\src\types\api.ts
// Conversation ID 목록을 가져오는 API의 응답 타입
export type ConversationIdListResponse = {
  list: {
    conversation_id: number;
    title: string;
  }[];
};

// 특정 대화의 상세 정보를 가져오는 API의 응답 타입
export type ConversationDetailsResponse = {
  title: string;
  engine: string;
  create_time: string; // DateTime 형식
  update_time: string; // DateTime 형식
  pairing: Pairing[];
};

// Pairing 객체 타입 정의
export type Pairing = {
  id: number;
  request_message: string;
  response_message: string;
  create_time: string; // DateTime 형식
  response_type: 'plain_text' | 'get_flight_info' | 'book_flight'; // 응답 종류
  data: PlainTextData | FlightInfoData | BoardingPassData | null; // 응답에 따라 데이터 구조 변경
};

// 새로운 대화를 생성하거나 기존 대화에 질문을 추가하는 요청 타입
export type PostConversationRequest = {
  conversation_id?: number | null; // 새로운 대화는 null, 기존 대화는 ID 입력해야함
  engine: string;
  question: string;
};

// POST 대화 요청의 응답 타입
export interface PostConversationResponse {
  id: number;
  response_type: 'plain_text' | 'get_flight_info' | 'book_flight'; // 응답 종류
  conversation_id: number; // 대화 식별 ID
  title: string; // 대화 제목
  answer: string; // 응답 메시지
  data: PlainTextData | FlightInfoData | BoardingPassData | null; // 응답에 따라 데이터 구조 변경
  create_time: string; // 응답 생성 시간 (UTC 시간)
}

// Plain Text 응답 타입
export interface PlainTextData {
  additionalInfo?: string; // Plain text에 추가 정보가 필요할 경우
}

// Flight Info 응답 타입
export interface FlightInfoData {
  date: string;
  departure: string;
  destination: string;
  departure_code: string;
  destination_code: string;
  list: FlightDetail[];
}

// 항공편 세부 정보
export interface FlightDetail {
  price: number;
  flight_time: string;
  departure_time: string;
  arrival_time: string;
}

// Boarding Pass 응답 타입
export interface BoardingPassData {
  airline: string;
  departure_code: string;
  destination_code: string;
  gate: string;
  class: string;
  seat: string;
  name: string;
  date: string;
  departure_time: string;
  arrival_time: string;
}

// Google OAuth 응답 타입
export type PostGoogleOAuthResponse = {
  accessToken: string;
  refreshToken: string;
};
