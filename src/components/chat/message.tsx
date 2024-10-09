import React from 'react';

// Message 컴포넌트의 props 타입 정의
interface MessageProps {
  role: 'user' | 'bot'; // 'user'와 'bot'만 허용
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div
      className={`p-4 mb-2 rounded-md max-w-lg ${
        role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
      }`}
    >
      {content}
    </div>
  );
};

export default Message;
