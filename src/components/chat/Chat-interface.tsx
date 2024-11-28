import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import CustomButtons from './CustomButtons';
import LoadingMessage from './LoadingMessage';
import { Send } from 'lucide-react';
import { usePostConversation, useConversationIdList, useConversationDetails } from '../../api/conversations';

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
      if (conversationIds.list.length > 0) {
        const recentConversationId = Math.max(...conversationIds.list);
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
      const existingMessages: Message[] = conversationDetails.pairing
        .map((pair) => [
          { role: 'user', content: pair.request_message } as Message,
          { role: 'assistant', content: pair.response_message } as Message,
        ])
        .flat();
      setMessages(existingMessages);
    }
  }, [conversationDetails]);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newUserMessage: Message = { role: 'user', content: userInput };
      const placeholderAssistantMessage: Message = {
        role: 'assistant',
        content: <LoadingMessage />,
      };

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
          if ('data' in response) {
            if (conversationId === null) {
              setConversationId(response.data.conversation_id);
            }

            const assistantMessage: Message = {
              role: 'assistant',
              content: response.data.answer || '응답이 없습니다.',
            };

            setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? assistantMessage : msg)));
          } else {
            console.warn('Invalid response format');
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
      {/* 사이드바 */}
      <Sidebar
        conversationIds={conversationIds ? conversationIds.list : []}
        selectedConversationId={conversationId}
        onSelectConversation={(id) => setConversationId(id)}
        onNewConversation={() => {
          setConversationId(null);
          setMessages([]);
        }}
        isLoading={isLoadingConversationIds}
      />

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 메시지 목록 */}
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

        {/* 커스텀 버튼 */}
        <div className="flex justify-center mb-0">
          <CustomButtons
            onCustomMessage={(component) => setMessages([...messages, { role: 'assistant', content: component }])}
          />
        </div>

        {/* 입력 부분 */}
        <div className="bg-gray-100 p-2 flex justify-center items-center" style={{ gap: '8px', marginBottom: '20px' }}>
          {/* 드롭다운 */}
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {['대한항공', '아시아나', '루프트한자', '에어캐나다', '에미레이트항공'].map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>

          {/* 메시지 입력 */}
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
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 ml-2"
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
