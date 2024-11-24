import React from 'react';
import ReactMarkdown from 'react-markdown';

// 메시지 데이터 타입 정의
type Message = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

// 메시지 목록 컴포넌트
type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  // 로딩 상태 처리
  if (isLoading) {
    return <div>대화 내용을 불러오는 중입니다...</div>;
  }

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {typeof msg.content === 'string' ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
