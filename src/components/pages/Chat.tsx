import React from 'react';
import ChatInterface from '../chat/Chat-interface';

const Chat: React.FC = () => {
  // TODO: login 연동 이후 주석 해제
  // if (!isSignin()) {
  //   window.alert('Please sign in to use Start Your Journey');
  //   return <Navigate to="/" />;
  // }
  return <ChatInterface />;
};

export default Chat;
