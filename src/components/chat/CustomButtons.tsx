import React from 'react';
import { ListFlights } from './custom-ui/Listflights';
import { PurchaseTickets } from './custom-ui/Purchasetickets';
import { FlightStatus } from './custom-ui/Flightstatus';

type CustomButtonsProps = {
  onCustomMessage: (component: React.ReactNode) => void;
  fetchFlightInfo?: () => Promise<any>;
};

const CustomButtons: React.FC<CustomButtonsProps> = ({ onCustomMessage, fetchFlightInfo }) => {
  const handleFetchFlights = async () => {
    if (!fetchFlightInfo) {
      console.warn('fetchFlightInfo 함수가 정의되지 않았습니다.');
      onCustomMessage(<div>항공편 정보를 가져올 수 없습니다.</div>);
      return;
    }

    try {
      const flightsData = await fetchFlightInfo();
      onCustomMessage(
        <ListFlights
          flights={flightsData.list.map((flight: any) => ({
            price: flight.price,
            flight_time: flight.flight_time,
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
          }))}
          summary={{
            arrivalCity: flightsData.destination,
            departingCity: flightsData.departure,
            arrivalAirport: flightsData.destination_code,
            departingAirport: flightsData.departure_code,
            date: flightsData.date,
          }}
        />
      );
    } catch (error) {
      console.error('Failed to fetch flight data:', error);
      onCustomMessage(<div>항공편 정보를 불러오지 못했습니다.</div>);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 p-1">
      <button
        onClick={() =>
          onCustomMessage(
            <PurchaseTickets
              summary={{
                airline: '대한항공',
                departureTime: '10:00 AM',
                arrivalTime: '12:00 PM',
                price: 350000,
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
