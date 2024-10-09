import { useState } from 'react';
import { getGeminiResponse } from './geminiAPI';

export const useGeminiChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setLoading(true);
    setError(null);

    try {
      const response = await getGeminiResponse(message);
      const botMessage = response.messages?.[0]?.content ?? 'No response from Gemini.';

      setMessages((prev) => [...prev, { role: 'bot', content: botMessage }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, error };
};
