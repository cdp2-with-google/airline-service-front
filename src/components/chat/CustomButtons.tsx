//todo: 추후 백엔드 개발 상황에 따라 적절히 활용 예정
import React from 'react';
import { BoardingPass } from './custom-ui/Boardingpass';
import { Destinations } from './custom-ui/Destinations';
import { ListFlights } from './custom-ui/Listflights';
import { PurchaseTickets } from './custom-ui/Purchasetickets';
import { FlightStatus } from './custom-ui/Flightstatus';

type CustomButtonsProps = {
  onCustomMessage: (component: React.ReactNode) => void;
};

const CustomButtons: React.FC<CustomButtonsProps> = ({ onCustomMessage }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-6">
      <button
        onClick={() =>
          onCustomMessage(
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
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
      >
        탑승권
      </button>
      <button
        onClick={() => onCustomMessage(<Destinations destinations={['Paris', 'Tokyo', 'New York']} />)}
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
      >
        목적지
      </button>
      <button
        onClick={() =>
          onCustomMessage(
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
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
      >
        항공편
      </button>
      <button
        onClick={() =>
          onCustomMessage(
            <PurchaseTickets
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
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
      >
        티켓 구매
      </button>
      <button
        onClick={() =>
          onCustomMessage(
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
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-600"
      >
        항공편 상태
      </button>
    </div>
  );
};

export default CustomButtons;
