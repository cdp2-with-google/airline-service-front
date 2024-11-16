import React from 'react';
import ReactMarkdown from 'react-markdown';

type MessageBubbleProps = {
  role: 'user' | 'assistant';
  content: string | React.ReactNode;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] p-3 rounded-2xl ${
          role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200'
        }`}
      >
        {typeof content === 'string' ? <ReactMarkdown>{content}</ReactMarkdown> : content}
      </div>
    </div>
  );
};

export default MessageBubble;
