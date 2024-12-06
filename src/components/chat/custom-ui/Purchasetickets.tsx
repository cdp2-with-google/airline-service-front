import React, { useState } from 'react';
import { User, CreditCard, Lock } from 'lucide-react';
import airlineLogo from '../../../assets/koreanair.png';
import { BoardingPass } from './Boardingpass';

type Status = 'requires_confirmation' | 'requires_code' | 'completed' | 'failed' | 'expired' | 'in_progress';

interface PurchaseProps {
  initialStatus?: Status;
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
  onComplete?: () => void; // onComplete 속성 추가
}

export const PurchaseTickets: React.FC<PurchaseProps> = ({
  initialStatus = 'requires_confirmation',
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
  onComplete,
}) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(initialStatus);
  const [code, setCode] = useState('');

  const handleConfirmPurchase = () => {
    setCurrentStatus('requires_code');
  };

  const handleSubmitCode = () => {
    setCurrentStatus('completed');

    // 로컬스토리지에 상태 저장
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="grid gap-4 p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-700">
          <CreditCard className="w-5 h-5" />
          <div className="text-sm">Visa · · · · 0512</div>
        </div>
        <div className="text-sm flex items-center gap-1 border border-gray-200 px-3 py-1 rounded-full text-gray-700">
          <Lock className="w-4 h-4" />
          안전 결제
        </div>
      </div>
      {currentStatus === 'requires_confirmation' && (
        <div className="flex flex-col gap-4">
          <div className="items-center">
            <p className="text-gray-700">대한항공 항공편을 선택해 주셔서 감사합니다!</p>
            <p>예약을 완료하려면 구매를 확인해 주세요.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-md">
            {/* 항공사 정보 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                <img src={airlineLogo} className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="font-semibold text-l">대한항공</h2>
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
                <p className="text-sm text-gray-600">{Number(summary.price)?.toLocaleString('ko-KR') ?? 'N/A'}원</p>
              </div>
            </div>
          </div>

          <button
            className="p-2 text-center rounded-full cursor-pointer bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            onClick={handleConfirmPurchase}
          >
            {Number(summary.price)?.toLocaleString('ko-KR')}원 결제하기
          </button>
        </div>
      )}
      {currentStatus === 'requires_code' && (
        <>
          <div className="text-gray-700">구매를 완료하려면 휴대폰 (***) **** 1524로 전송된 코드를 입력하세요.</div>
          <div className="flex justify-center p-2 text-center border rounded-full text-gray-700">
            <input
              className="w-32 text-center bg-transparent outline-none"
              type="text"
              maxLength={6}
              placeholder="------"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>
          <button
            className={`p-2 text-center rounded-full cursor-pointer ${
              code.length === 6
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
            onClick={handleSubmitCode}
            disabled={code.length !== 6}
          >
            제출
          </button>
        </>
      )}
      {currentStatus === 'completed' && (
        <div className="text-center text-gray-700">
          <p className="font-bold text-lg">구매가 완료되었습니다!</p>
          <p>구글 캘린더에 비행일정이 추가되었습니다.</p>
          <div className="mt-4">
            <BoardingPass summary={summary} />
          </div>
        </div>
      )}
    </div>
  );
};
