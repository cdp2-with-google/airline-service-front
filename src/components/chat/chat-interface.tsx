import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { usePostConversation, useConversationIdList, useConversationDetails } from '../../api/conversations';
import { BoardingPass } from './custom-ui/boardingpass';
import { Destinations } from './custom-ui/destinations';
import { ListFlights } from './custom-ui/listflights';
import { PurchaseTickets } from './custom-ui/purchasetickets';
import { FlightStatus } from './custom-ui/flightstatus';

type Message = {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
};

const ChatInterface: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const { handlePostConversation } = usePostConversation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 메시지 끝부분 참조

  const { data: conversationIds, isLoading: isLoadingConversationIds } = useConversationIdList();

  useEffect(() => {
    if (conversationIds && conversationIds.list.length > 0) {
      const maxId = Math.max(...conversationIds.list);
      setConversationId(maxId);
      console.log('자동으로 선택된 대화 ID:', maxId);
    }
  }, [conversationIds]);

  const {
    data: conversationDetails,
    isLoading: isLoadingConversationDetails,
    refetch,
  } = useConversationDetails(conversationId ?? -1);

  useEffect(() => {
    if (conversationId !== null) {
      refetch();
      console.log('선택된 대화 ID:', conversationId);
    }
  }, [conversationId, refetch]);

  useEffect(() => {
    if (conversationDetails) {
      console.log('대화 상세 내용:', conversationDetails);
      const existingMessages: Message[] = conversationDetails.pairing
        .map((pair) => [
          { role: 'user' as 'user', content: pair.request_message },
          { role: 'assistant' as 'assistant', content: pair.response_message },
        ])
        .flat();
      setMessages(existingMessages);
    }
  }, [conversationDetails]);

  const handleSelectConversation = (id: number) => {
    setConversationId(id);
  };

  const handleStartNewConversation = () => {
    setConversationId(null);
    setMessages([]);
    console.log('새로운 대화 시작');
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: userInput }]);

      try {
        const response = await handlePostConversation({
          conversation_id: conversationId,
          engine: 'test-engine',
          question: userInput,
        });

        if (response) {
          if (conversationId === null) {
            setConversationId(response.data.conversation_id);
          }

          const answer = response.data.answer;
          setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
          console.log('API 응답:', response);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setMessages((prev) => [...prev, { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' }]);
      }

      setUserInput('');
    }
  };

  // 스크롤을 대화 목록의 하단으로 이동
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 메시지가 업데이트될 때마다 스크롤 이동

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCustomMessage = (component: React.ReactNode) => {
    setMessages((prev) => [...prev, { role: 'assistant', content: component }]);
  };

  const renderMessageContent = (content: string | React.ReactNode) => {
    if (typeof content === 'string') {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    } else {
      return React.isValidElement(content) ? content : null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/5 bg-gray-200 border-r border-gray-300 flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <h2 className="text-lg font-bold mb-4">대화 목록</h2>
          {isLoadingConversationIds ? (
            <div>대화 목록 불러오는 중...</div>
          ) : !conversationIds || conversationIds.list.length === 0 ? (
            <div>대화 목록이 없습니다.</div>
          ) : (
            <ul className="space-y-2">
              {conversationIds.list.map((id: number) => (
                <li key={id}>
                  <button
                    onClick={() => handleSelectConversation(id)}
                    className={`w-full text-left px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                      conversationId === id
                        ? 'bg-purple-700 text-white'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    대화 {id}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t border-gray-300">
          <button
            onClick={handleStartNewConversation}
            className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg focus:outline-none focus:ring-2 hover:bg-purple-600 transition duration-150 flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            새로운 대화
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            {isLoadingConversationDetails && conversationId !== null ? (
              <div>대화 내용 불러오는 중...</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white text-purple-700 border border-purple-200'
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))
            )}
            {/* 스크롤을 관리하는 참조 요소 */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
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
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
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
    </div>
  );
};

export default ChatInterface;
