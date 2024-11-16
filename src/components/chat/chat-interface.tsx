import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import CustomButtons from './CustomButtons';
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

  // API 연결 : 대화 ID 목록 가져오기
  const { data: conversationIds, isLoading: isLoadingConversationIds } = useConversationIdList();

  // API 연결 : 대화 상세 내용 가져오기
  const {
    data: conversationDetails,
    isLoading: isLoadingConversationDetails,
    refetch,
  } = useConversationDetails(conversationId ?? -1);

  // API 연결 : 대화 메시지 전송
  const { handlePostConversation } = usePostConversation();

  // 가장 최근 대화(id값이 가장 큰 대화)를 자동으로 선택하도록 설정
  useEffect(() => {
    if (conversationIds) {
      if (conversationIds.list.length > 0) {
        const recentConversationId = Math.max(...conversationIds.list);
        setConversationId(recentConversationId);
        console.log('자동으로 선택된 대화 ID:', recentConversationId);
      } else {
        console.log('대화 목록이 비어 있습니다.');
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

  // 메시지 보내기 : 메세지를 보내자마자 input박스를 비워주기 위해 입력값을 임시저장
  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
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

            const answer = response.data.answer || '응답이 없습니다.';
            setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
          } else {
            console.warn('Invalid response format');
          }
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        setMessages((prev) => [...prev, { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' }]);
      }
    }
  };

  // 대화 목록 하단에 스크롤 고정
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
      {/* 사이드바 부분*/}
      <Sidebar
        conversationIds={conversationIds ? conversationIds.list : []}
        selectedConversationId={conversationId}
        onSelectConversation={(id) => setConversationId(id)}
        onNewConversation={() => {
          setConversationId(null);
          setMessages([]);
        }}
        isLoading={isLoadingConversationIds} // 대화 목록 로딩 상태
      />

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 메시지 목록 */}
        <div className="flex-grow overflow-y-auto p-4">
          {isLoadingConversationDetails && conversationId !== null ? (
            <div className="flex items-center justify-center h-full">
              <span>대화 내용을 불러오는 중입니다...</span>
            </div>
          ) : messages.length === 0 && conversationId === null ? (
            <div className="text-center text-gray-500">새로운 대화를 시작하세요!</div>
          ) : (
            <MessageList messages={messages} isLoading={isLoadingConversationDetails} />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 커스텀 버튼 */}
        <CustomButtons
          onCustomMessage={(component) => setMessages([...messages, { role: 'assistant', content: component }])}
        />

        {/* 입력 부분 */}
        <div className="bg-gray-100 p-4 border-gray-300 sticky bottom-0 flex justify-center">
          <div className="flex items-부center space-x-2 w-2/3">
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
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
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
