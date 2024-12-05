import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import LoadingMessage from './LoadingMessage';
import { Send } from 'lucide-react';
import { usePostConversation, useConversationIdList, useConversationDetails } from '../../api/conversations';
import ListFlights from './custom-ui/Listflights';
import { FlightInfoData } from '../../types/api';
import { BoardingPass } from './custom-ui/Boardingpass';
import { PurchaseTickets } from './custom-ui/Purchasetickets';
import LogoutButton from '../common/LogoutButton';

type Message = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

const ChatInterface: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string>('대한항공');

  const { data: conversationIds, isLoading: isLoadingConversationIds } = useConversationIdList();
  const {
    data: conversationDetails,
    isLoading: isLoadingConversationDetails,
    refetch,
  } = useConversationDetails(conversationId ?? -1);

  const { handlePostConversation } = usePostConversation();

  useEffect(() => {
    if (conversationIds) {
      console.log('ConversationIdListResponse 데이터:', conversationIds);

      if (conversationIds.list.length > 0) {
        // conversation_id 값만 추출
        const recentConversationId = Math.max(...conversationIds.list.map((item) => item.conversation_id));
        setConversationId(recentConversationId);
      } else {
        setConversationId(null);
        setMessages([]);
      }
    }
  }, [conversationIds]);

  useEffect(() => {
    if (conversationId !== null) {
      refetch();
    }
  }, [conversationId, refetch]);

  useEffect(() => {
    if (conversationDetails) {
      console.log('가져온 상세 대화 데이터:', conversationDetails);
      const existingMessages: Message[] = conversationDetails.pairing.flatMap((pair) => {
        console.log('개별 페어 데이터:', pair);

        const userMessage: Message = { role: 'user', content: pair.request_message };
        const assistantMessages: Message[] = [];

        if (pair.response_type === 'book_flight' && pair.data) {
          assistantMessages.push({
            role: 'assistant',
            content: renderPurchaseTickets(pair.data, pair.id), // pair.id 전달
          });
        } else if (pair.response_type === 'get_flight_info' && pair.data) {
          assistantMessages.push({
            role: 'assistant',
            content: renderFlightInfo(pair.data as FlightInfoData),
          });
        } else {
          assistantMessages.push({
            role: 'assistant',
            content: logPlainTextResponse(pair.response_message),
          });
        }

        return [userMessage, ...assistantMessages];
      });

      setMessages(existingMessages);
    }
  }, [conversationDetails]);

  const renderFlightInfo = (data: FlightInfoData) => {
    const transformedFlights = data.list.map((flight, index) => ({
      id: index + 1,
      airlines: selectedAirline,
      departureTime: flight.departure_time,
      arrivalTime: flight.arrival_time,
      price: flight.price,
    }));

    return (
      <ListFlights
        flights={transformedFlights}
        summary={{
          arrivalCity: data.destination,
          departingCity: data.departure,
          arrivalAirport: data.destination_code,
          departingAirport: data.departure_code,
          date: data.date,
        }}
      />
    );
  };

  // const renderBoardingPass = (data: any) => {
  //   return (
  //     <BoardingPass
  //       summary={{
  //         airline: data.airline,
  //         arrival: data.destination_code,
  //         departure: data.departure_code,
  //         departureTime: data.departure_time,
  //         arrivalTime: data.arrival_time,
  //         seat: data.seat,
  //         date: data.date,
  //         gate: data.gate,
  //         name: data.name,
  //         class: data.class,
  //       }}
  //     />
  //   );
  // };

  const renderPurchaseTickets = (data: any, pairingId: number) => {
    const key = `conversation_${conversationId}_pair_${pairingId}`;
    const isCompleted = localStorage.getItem(key) === 'completed';
    const initialStatus = isCompleted ? 'completed' : 'requires_confirmation';

    console.log('상태 복원 확인 - 키:', key, '상태:', isCompleted ? 'completed' : 'requires_confirmation');

    return (
      <PurchaseTickets
        initialStatus={initialStatus}
        summary={{
          airline: data.airline || '퍼플 에어',
          arrival: data.destination_code || '도쿄',
          departure: data.departure_code || '서울',
          departureTime: data.departure_time || '09:00',
          arrivalTime: data.arrival_time || '11:30',
          price: data.price || 350000,
          seat: data.seat || '12A',
          date: data.date || '2024-03-15',
          gate: data.gate || '23',
          name: data.name || '김철수',
          class: data.class || '이코노미',
        }}
        onComplete={() => {
          // 상태 저장
          localStorage.setItem(key, 'completed');
          console.log('onComplete 호출됨 - 키 저장:', key);
          console.log('로컬스토리지 저장 확인:', localStorage.getItem(key));
        }}
      />
    );
  };

  const logPlainTextResponse = (responseMessage: string) => {
    return responseMessage;
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newUserMessage: Message = { role: 'user', content: userInput };
      const placeholderAssistantMessage: Message = { role: 'assistant', content: <LoadingMessage /> };

      setMessages((prev) => [...prev, newUserMessage, placeholderAssistantMessage]);

      const currentInput = userInput;
      setUserInput('');

      try {
        const response = await handlePostConversation({
          conversation_id: conversationId,
          engine: 'test-engine',
          question: currentInput,
        });

        if (response) {
          if (response.response_type === 'book_flight' && response.data) {
            const pairingId = Date.now(); // 고유 ID 생성
            const purchaseMessage: Message = {
              role: 'assistant',
              content: renderPurchaseTickets(response.data, pairingId), // 두 번째 인수 pairingId 전달
            };
            setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? purchaseMessage : msg)));
          } else {
            const assistantMessage: Message = {
              role: 'assistant',
              content:
                response.response_type === 'get_flight_info' && response.data
                  ? renderFlightInfo(response.data as FlightInfoData)
                  : logPlainTextResponse(response.answer || '응답이 없습니다.'),
            };
            setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? assistantMessage : msg)));
          }
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        const errorMessage: Message = { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' };
        setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? errorMessage : msg)));
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      <LogoutButton />

      <Sidebar
        conversationIds={
          conversationIds ? conversationIds.list.map(({ conversation_id, title }) => ({ conversation_id, title })) : []
        } // 데이터 변환
        selectedConversationId={conversationId}
        onSelectConversation={(id) => setConversationId(id)} // conversation_id 전달
        onNewConversation={() => {
          setConversationId(null);
          setMessages([]);
        }}
        isLoading={isLoadingConversationIds}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {isLoadingConversationDetails && conversationId !== null ? (
            <div className="flex items-center justify-center h-full">
              <LoadingMessage />
            </div>
          ) : messages.length === 0 && conversationId === null ? (
            <div className="text-center text-gray-500">새로운 대화를 시작하세요!</div>
          ) : (
            <MessageList messages={messages} isLoading={isLoadingConversationDetails} />
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* <div className="flex justify-center mb-0">
          <CustomButtons
            onCustomMessage={(component) => setMessages([...messages, { role: 'assistant', content: component }])}
          />
        </div> */}
        <div className="bg-gray-100 p-2 flex justify-center items-center" style={{ gap: '8px', marginBottom: '20px' }}>
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="p-2 h-10 border border-gray-300 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {['대한항공', '아시아나', '루프트한자', '에어캐나다', '에미레이트항공'].map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
          <div className="flex items-center w-2/3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="메시지를 입력하세요."
              className="flex-1 p-2 h-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 ml-2"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
