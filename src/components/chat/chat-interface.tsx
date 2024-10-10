import { useState } from 'react';
import { useGeminiChat } from '../../lib/useGeminiChat';
import { Send } from 'lucide-react';

import { BoardingPass } from './custom-ui/boardingpass';
import { Destinations } from './custom-ui/destinations';
import { ListFlights } from './custom-ui/listflights';
import { PurchaseTickets } from './custom-ui/purchasetickets';
import { FlightStatus } from './custom-ui/flightstatus';

const ChatInterface: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const { messages, sendMessage, loading } = useGeminiChat();
  const [customMessages, setCustomMessages] = useState<React.ReactNode[]>([]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCustomMessage = (component: React.ReactNode) => {
    setCustomMessages([...customMessages, component]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-purple-700 border border-purple-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {customMessages.map((msg, index) => (
            <div key={`custom-${index}`} className="mb-4">
              {msg}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex justify-center space-x-2 mb-4">
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
                  // status="requires_confirmation"
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
        <div className="flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
            className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
