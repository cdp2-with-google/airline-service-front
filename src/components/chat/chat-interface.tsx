import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { usePostConversation } from '../../api/conversations'; // API 연결
import { BoardingPass } from './custom-ui/boardingpass';
import { Destinations } from './custom-ui/destinations';
import { ListFlights } from './custom-ui/listflights';
import { PurchaseTickets } from './custom-ui/purchasetickets';
import { FlightStatus } from './custom-ui/flightstatus';

// 메시지 타입 정의
type Message = {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
};

const ChatInterface: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const { handlePostConversation } = usePostConversation();

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (userInput.trim()) {
      // 사용자 메시지를 UI에 즉시 추가
      setMessages((prev) => [...prev, { role: 'user', content: userInput }]);

      try {
        const response = await handlePostConversation({
          conversation_id: conversationId,
          engine: 'test-engine',
          question: userInput,
        });

        console.log('API 응답:', response); // 응답 로깅

        if (response) {
          // 대화 ID가 없다면 새로 설정
          if (!conversationId) {
            setConversationId(response.data.conversation_id);
          }

          // 응답 데이터를 로그로 확인
          const answer = response.data.answer; // response.data.answer로 수정
          console.log('응답 answer:', answer);

          // 어시스턴트의 응답을 UI에 추가
          setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);

          // 업데이트된 메시지 로그로 확인
          console.log('업데이트된 메시지 배열:', messages);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        // 오류 메시지를 UI에 표시
        setMessages((prev) => [...prev, { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' }]);
      }

      setUserInput('');
    }
  };

  // 엔터 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // UI만 표시하는 커스텀 메시지 처리
  const handleCustomMessage = (component: React.ReactNode) => {
    setMessages((prev) => [...prev, { role: 'assistant', content: component }]);
  };

  // 메시지 내용 렌더링 함수
  const renderMessageContent = (content: string | React.ReactNode) => {
    if (typeof content === 'string') {
      return content;
    } else {
      return React.isValidElement(content) ? content : null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {/* 대화 메시지 표시 */}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200'
                }`}
              >
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 커스텀 메시지를 보낼 버튼들 */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() =>
              handleCustomMessage(
                <BoardingPass
                  summary={{
                    airline: 'American Airlines',
                    arrival: 'SFO',
                    departure: 'NYC',
                    departureTime: '10:00 AM',
                    arrivalTime: '12:00 PM',
                    price: 100,
                    seat: '1A',
                    date: '2021-12-25',
                    gate: '31',
                  }}
                />
              )
            }
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          >
            탑승권
          </button>
          <button
            onClick={() => handleCustomMessage(<Destinations destinations={['Paris', 'Tokyo', 'New York']} />)}
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          >
            목적지
          </button>
          <button
            onClick={() =>
              handleCustomMessage(
                <ListFlights
                  summary={{
                    arrivalCity: 'San Francisco',
                    departingCity: 'New York City',
                    arrivalAirport: 'SFO',
                    departingAirport: 'JFK',
                    date: '2021-12-25',
                  }}
                />
              )
            }
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          >
            항공편
          </button>
          <button
            onClick={() =>
              handleCustomMessage(
                <PurchaseTickets
                  summary={{
                    airline: 'American Airlines',
                    departureTime: '10:00 AM',
                    arrivalTime: '12:00 PM',
                    price: 100,
                    seat: '1A',
                  }}
                />
              )
            }
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          >
            티켓 구매
          </button>
          <button
            onClick={() =>
              handleCustomMessage(
                <FlightStatus
                  summary={{
                    departingCity: 'Miami',
                    departingAirport: 'Miami Intl',
                    departingAirportCode: 'MIA',
                    departingTime: '11:45 PM',
                    arrivalCity: 'San Francisco',
                    arrivalAirport: 'San Francisco Intl',
                    arrivalAirportCode: 'SFO',
                    arrivalTime: '4:20 PM',
                    flightCode: 'XY 2421',
                    date: 'Mon, 16 Sep',
                  }}
                />
              )
            }
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          >
            항공편 상태
          </button>
        </div>

        {/* 메시지 입력 및 전송 */}
        <div className="flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
