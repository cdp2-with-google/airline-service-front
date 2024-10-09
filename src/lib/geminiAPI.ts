import { GoogleGenerativeAI } from '@google/generative-ai'; // GoogleGenerativeAI 클래스 import

// 환경 변수에서 API 키 가져오기
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!geminiApiKey) {
  throw new Error('API key is not defined. Please check your .env file.');
}

// GoogleGenerativeAI 인스턴스 생성
const client = new GoogleGenerativeAI(geminiApiKey);

/**
 * 사용자의 메시지를 Google Gemini API로 전송하고, 응답을 반환하는 함수.
 * @param userMessage
 * @returns
 */
export const getGeminiResponse = async (userMessage: string) => {
  try {
    //1.5 flash 모델 설정
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // startChat 메서드를 사용
    const chatSession = model.startChat({
      history: [], // 기존 대화 히스토리 설정
      generationConfig: {
        maxOutputTokens: 200, // 최대 응답 토큰 설정
      },
    });

    // 사용자 메시지 전송
    const result = await chatSession.sendMessage(userMessage);

    // 응답 메시지를 추출하여 반환
    const botMessage = result.response.text();
    return { messages: [{ role: 'bot', content: botMessage }] };
  } catch (error) {
    throw new Error(`Failed to fetch Gemini API: ${(error as Error).message}`);
  }
};
