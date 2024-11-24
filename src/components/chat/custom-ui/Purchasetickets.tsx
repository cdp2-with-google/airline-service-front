import React, { useState } from 'react';
import { CreditCard, Lock, Sparkles } from 'lucide-react';

type Status = 'requires_confirmation' | 'requires_code' | 'completed' | 'failed' | 'expired' | 'in_progress';

interface PurchaseProps {
  initialStatus?: Status;
  summary?: {
    airline: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seat: string;
  };
}

export const PurchaseTickets: React.FC<PurchaseProps> = ({
  initialStatus = 'requires_confirmation',
  summary = {
    airline: '퍼플 에어',
    departureTime: '08:30',
    arrivalTime: '11:20',
    price: 350000,
    seat: '12A',
  },
}) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(initialStatus);
  const [code, setCode] = useState('');

  const handleConfirmPurchase = () => {
    setCurrentStatus('requires_code');
  };

  const handleSubmitCode = () => {
    setCurrentStatus('completed');
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
          <p className="text-gray-700">
            {summary.airline} 항공편을 선택해 주셔서 감사합니다! 예약을 완료하려면 구매를 확인해 주세요.
          </p>
          <button
            className="p-2 text-center rounded-full cursor-pointer bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            onClick={handleConfirmPurchase}
          >
            ₩{summary.price.toLocaleString()} 결제하기
          </button>
        </div>
      )}
      {currentStatus === 'requires_code' && (
        <>
          <div className="text-gray-700">구매를 완료하려면 휴대폰 (***) *** 6137로 전송된 코드를 입력하세요.</div>
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
            className="p-2 text-center rounded-full cursor-pointer bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            onClick={handleSubmitCode}
          >
            제출
          </button>
        </>
      )}
      {currentStatus === 'completed' && (
        <div className="text-center text-gray-700">
          <p className="font-bold text-lg">구매가 완료되었습니다!</p>
          <p>예약 확인 이메일을 곧 받으실 것입니다.</p>
        </div>
      )}
      {(currentStatus === 'completed' || currentStatus === 'in_progress') && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl cursor-pointer">
            <Sparkles className="w-4 h-4" />
            항공편 상태 보기
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl cursor-pointer">
            <Sparkles className="w-4 h-4" />
            탑승권 보기
          </button>
        </div>
      )}
    </div>
  );
};
