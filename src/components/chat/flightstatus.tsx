import React from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import airlineLogo from '../../assets/koreanair.png';

export interface StatusProps {
  summary?: {
    departingCity: string;
    departingAirport: string;
    departingAirportCode: string;
    departingTime: string;
    arrivalCity: string;
    arrivalAirport: string;
    arrivalAirportCode: string;
    arrivalTime: string;
    flightCode: string;
    date: string;
  };
}

export const FlightStatus: React.FC<StatusProps> = ({
  summary = {
    departingCity: '서울',
    departingAirport: '인천 국제공항',
    departingAirportCode: 'ICN',
    departingTime: '08:30',
    arrivalCity: '도쿄',
    arrivalAirport: '하네다 국제공항',
    arrivalAirportCode: 'HND',
    arrivalTime: '11:20',
    flightCode: 'PA 1234',
    date: '2024-03-15',
  },
}) => {
  const {
    departingCity,
    departingAirport,
    departingAirportCode,
    departingTime,
    arrivalCity,
    arrivalAirport,
    arrivalAirportCode,
    arrivalTime,
    flightCode,
    date,
  } = summary;

  return (
    <div className="grid gap-4 p-4 sm:p-6 border border-purple-200 rounded-2xl bg-white">
      <div className="flex items-center gap-4">
        <div className="w-10 sm:w-12 shrink-0 aspect-square rounded-lg bg-purple-50 overflow-hidden">
          <img src={airlineLogo} className="object-cover aspect-square" alt="airline logo" />
        </div>
        <div>
          <div className="font-medium">
            {date} · {flightCode}
          </div>
          <div className="text-sm text-purple-600">
            {departingCity}에서 {arrivalCity}까지
          </div>
        </div>
      </div>
      <div className="grid items-center gap-8 relative">
        <div className="w-px h-full absolute top-1 left-[1.1rem] sm:left-[1.45rem] bg-purple-200" />
        <div className="flex w-full relative gap-4 pl-2 sm:pl-3.5 items-start">
          <div className="rounded-full bg-purple-100 p-1 text-purple-600 [&>svg]:size-2.5 size-5 flex items-center justify-center shrink-0 translate-y-1">
            <ArrowUpRight />
          </div>
          <div>
            <div className="text-2xl font-medium">{departingAirportCode}</div>
            <div>{departingAirport}</div>
            <div className="text-sm text-purple-600">터미널 1 · 게이트 15</div>
          </div>
          <div className="ml-auto font-mono">
            <div className="text-lg md:text-xl">{departingTime}</div>
            <div className="text-sm text-purple-600">정시 출발</div>
          </div>
        </div>
        <div className="flex w-full relative gap-4 pl-2 sm:pl-3.5 min-h-10 items-center">
          <div className="rounded-full bg-purple-100 p-1 text-purple-600 [&>svg]:size-2.5 size-5 flex items-center justify-center shrink-0">
            <Check />
          </div>
          <div className="text-sm sm:text-base text-purple-600">총 2시간 50분 · 1,157km</div>
        </div>
        <div className="flex w-full relative gap-4 pl-2 sm:pl-3.5 items-start">
          <div className="rounded-full bg-purple-100 p-1 text-purple-600 [&>svg]:size-2.5 size-5 flex items-center justify-center shrink-0 translate-y-1">
            <ArrowDownRight />
          </div>
          <div>
            <div className="text-2xl font-medium">{arrivalAirportCode}</div>
            <div>{arrivalAirport}</div>
            <div className="text-sm text-purple-600">터미널 3 · 게이트 26</div>
          </div>
          <div className="ml-auto font-mono">
            <div className="text-lg md:text-xl">{arrivalTime}</div>
            <div className="text-sm text-purple-600">정시 도착 예정</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl cursor-pointer">
          <Sparkles className="w-4 h-4" />
          좌석 변경
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl cursor-pointer">
          <Sparkles className="w-4 h-4" />
          항공편 변경
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl cursor-pointer">
          <Sparkles className="w-4 h-4" />
          탑승권 보기
        </button>
      </div>
    </div>
  );
};
