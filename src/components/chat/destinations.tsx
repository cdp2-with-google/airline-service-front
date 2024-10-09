import React from 'react';
import { Sparkles } from 'lucide-react';

interface DestinationsProps {
  destinations?: string[];
}

export const Destinations: React.FC<DestinationsProps> = ({
  destinations = ['도쿄', '파리', '뉴욕', '런던', '시드니'],
}) => {
  return (
    <div className="grid gap-4 p-4 sm:p-6 border border-purple-200 rounded-2xl bg-white">
      <p className="text-purple-700">여행하고 싶은 목적지 목록입니다. 항공편을 예약하려면 하나를 선택하세요.</p>
      <div className="flex flex-wrap gap-2">
        {destinations.map((destination) => (
          <button
            key={destination}
            className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {destination}
          </button>
        ))}
      </div>
    </div>
  );
};
