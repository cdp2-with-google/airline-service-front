import React from 'react';
import airlineLogo from '../../../assets/koreanair.png';

interface Flight {
  id: number;
  airlines: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface ListFlightsProps {
  summary?: {
    arrivalCity: string;
    departingCity: string;
    arrivalAirport: string;
    departingAirport: string;
    date: string;
  };
}

export const ListFlights: React.FC<ListFlightsProps> = ({
  summary = {
    arrivalCity: '도쿄',
    departingCity: '서울',
    arrivalAirport: 'HND',
    departingAirport: 'ICN',
    date: '2024-03-15',
  },
}) => {
  const { arrivalCity, departingCity, arrivalAirport, departingAirport, date } = summary;

  const flights: Flight[] = [
    {
      id: 1,
      airlines: '퍼플 에어',
      departureTime: '08:30',
      arrivalTime: '11:20',
      price: 350000,
    },
    {
      id: 2,
      airlines: '라벤더 항공',
      departureTime: '12:40',
      arrivalTime: '15:25',
      price: 380000,
    },
    {
      id: 3,
      airlines: '바이올렛 익스프레스',
      departureTime: '16:00',
      arrivalTime: '18:50',
      price: 420000,
    },
  ];

  return (
    <div className="grid gap-2 rounded-2xl border border-gray-200 bg-white p-2 sm:p-4">
      <div className="grid gap-2 sm:flex sm:flex-row justify-between border-b p-2">
        <div className="sm:basis-1/4">
          <div className="text-xs text-gray-600">출발</div>
          <div className="font-medium">{departingCity}</div>
        </div>
        <div className="sm:basis-1/4">
          <div className="text-xs text-gray-600">도착</div>
          <div className="font-medium">{arrivalCity}</div>
        </div>
        <div className="sm:basis-1/2">
          <div className="sm:text-right text-xs text-gray-600">날짜</div>
          <div className="sm:text-right font-medium">{date}</div>
        </div>
      </div>
      <div className="grid gap-3">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-2 hover:bg-gray-50"
          >
            <div className="w-10 sm:w-12 shrink-0 aspect-square rounded-lg bg-gray-50 overflow-hidden">
              <img src={airlineLogo} className="object-cover aspect-square" alt="airline logo" />
            </div>
            <div className="grid gap-4 sm:grid-cols-4 items-start sm:gap-6 flex-1">
              <div className="col-span-2">
                <div className="font-medium">
                  {flight.departureTime} - {flight.arrivalTime}
                </div>
                <div className="text-sm text-gray-600">{flight.airlines}</div>
              </div>
              <div>
                <div className="font-medium">2시간 50분</div>
                <div className="text-sm text-gray-600">
                  {departingAirport} - {arrivalAirport}
                </div>
              </div>
              <div>
                <div className="sm:text-right font-medium font-mono">₩{flight.price.toLocaleString()}</div>
                <div className="sm:text-right text-xs text-gray-600">편도</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
