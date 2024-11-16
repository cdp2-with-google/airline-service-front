// import React, { useState, useEffect } from 'react';

// type LoadingMessageProps = {
//   baseText: string;
// };

// const LoadingMessage: React.FC<LoadingMessageProps> = ({ baseText }) => {
//   const [dots, setDots] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <span>
//       {baseText}
//       {dots}
//     </span>
//   );
// };

// export default LoadingMessage;

// interface LoadingMessageProps {
//   baseText: string;
// }

export default function LoadingMessage() {
  return (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
}
