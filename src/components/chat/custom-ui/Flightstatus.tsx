import React from 'react';
import { User, CreditCard } from 'lucide-react';
import airlineLogo from '../../../assets/koreanair.png';

export interface StatusProps {
  summary?: {
    airline: string;
    arrival: string;
    departure: string;
    departureTime: string;
    arrivalTime: string;
    price?: number;
    seat: string;
    date: string;
    gate: string;
    name: string;
    class: string;
  };
}

export const FlightStatus: React.FC<StatusProps> = ({
  summary = {
    airline: '대한항공',
    arrival: '도쿄',
    departure: '서울',
    departureTime: '09:00',
    arrivalTime: '11:30',
    price: 350000,
    seat: '12A',
    date: '2024-03-15',
    gate: '23',
    name: '김현우',
    class: '이코노미',
  },
}) => {
  return (
    <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-md">
      {/* 항공사 정보 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
          <img src={airlineLogo} className="object-cover w-full h-full" alt={`${summary.airline} logo`} />
        </div>
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold text-l">{summary.airline}</h2>
            <p className="font-semibold text-sm text-gray-600 ml-4">{summary.date}</p>
          </div>
          <div className="flex gap-4 mt-1">
            <p className="text-sm text-gray-600">게이트: {summary.gate}</p>
            <p className="text-sm text-gray-600">좌석: {summary.seat}</p>
            <p className="text-sm text-gray-600">클래스: {summary.class}</p>
          </div>
        </div>
      </div>

      {/* 비행 정보 */}
      <div className="grid grid-cols-[2fr,auto,2fr] gap-2 items-center mb-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold">{summary.departure}</h3>
          <p className="text-lg">{summary.departureTime}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-gray-300"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{summary.arrival}</h3>
          <p className="text-lg">{summary.arrivalTime}</p>
        </div>
      </div>

      {/* 예약자 정보 및 가격 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-gray-600" />
            <h4 className="font-medium text-gray-700">예약자 정보</h4>
          </div>
          <p className="text-sm text-gray-600">이름 : {summary.name}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="text-gray-600" />
            <h4 className="font-medium text-gray-700">가격 정보</h4>
          </div>
          <p className="text-sm text-gray-600">₩{summary.price?.toLocaleString() ?? 'N/A'}원</p>
        </div>
      </div>
    </div>
  );
};
