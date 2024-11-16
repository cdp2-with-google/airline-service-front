import React from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
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
                msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200'
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
