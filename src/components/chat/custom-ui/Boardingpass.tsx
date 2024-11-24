import React from 'react';
import Barcode from 'react-barcode';
import airlineLogo from '../../../assets/koreanair.png';

interface BoardingPassProps {
  summary?: {
    airline: string;
    arrival: string;
    departure: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seat: string;
    date: string;
    gate: string;
  };
}

export const BoardingPass: React.FC<BoardingPassProps> = ({
  summary = {
    airline: '퍼플 에어',
    arrival: '도쿄',
    departure: '서울',
    departureTime: '09:00',
    arrivalTime: '11:30',
    price: 350000,
    seat: '12A',
    date: '2024-03-15',
    gate: '23',
  },
}) => {
  return (
    <div className="grid gap-4 p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white">
      <div className="flex gap-4 items-start">
        <div className="w-10 sm:w-12 shrink-0 aspect-square rounded-lg bg-gray-50 overflow-hidden">
          <img src={airlineLogo} className="object-cover aspect-square" alt="airline logo" />
        </div>
        <div>
          <div className="font-medium text-lg">{summary.airline}</div>
          <div className="text-sm text-gray-600">
            {summary.departure} - {summary.arrival}
          </div>
        </div>
        <div className="ml-auto text-center">
          <div className="text-xs text-gray-600 uppercase">게이트</div>
          <div className="text-2xl font-mono">{summary.gate}</div>
        </div>
      </div>
      <div className="grid gap-1 p-4 rounded-xl bg-gray-50">
        <div className="font-medium text-lg">승객 이름</div>
        <div className="flex text-sm justify-between">
          <div>{summary.departure}</div>
          <div>{summary.date}</div>
          <div>{summary.arrival}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="px-4 py-3 rounded-xl bg-gray-50 grid gap-1">
          <div className="text-xs text-gray-600 uppercase">좌석</div>
          <div className="text-2xl font-mono leading-none">{summary.seat}</div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-gray-50 flex-1 grid gap-1">
          <div className="text-xs text-gray-600 uppercase">클래스</div>
          <div className="text-xl leading-none">이코노미</div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-gray-50 grid gap-1">
          <div className="text-xs text-gray-600 uppercase">출발</div>
          <div className="text-xl leading-none">{summary.departureTime}</div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-gray-50 grid gap-1">
          <div className="text-xs text-gray-600 uppercase">도착</div>
          <div className="text-xl leading-none">{summary.arrivalTime}</div>
        </div>
      </div>
      <div className="hidden sm:flex justify-center">
        <Barcode value="12345BOARDINGPASS" format="CODE128" width={1.5} height={50} displayValue={false} />
      </div>
    </div>
  );
};
