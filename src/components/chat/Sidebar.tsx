import React from 'react';

type SidebarProps = {
  conversationIds: number[];
  selectedConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewConversation: () => void;
  isLoading: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  conversationIds,
  selectedConversationId,
  onSelectConversation,
  onNewConversation,
  isLoading,
}) => {
  return (
    <div className="w-1/5 bg-gray-200 border-r border-gray-300 flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4">대화 목록</h2>
        {isLoading ? (
          <div>대화 목록 불러오는 중...</div>
        ) : conversationIds.length === 0 ? (
          <div>대화 목록이 없습니다.</div>
        ) : (
          <ul className="space-y-2">
            {conversationIds.map((id) => (
              <li key={id}>
                <button
                  onClick={() => onSelectConversation(id)}
                  className={`w-full text-left px-3 py-2 rounded-lg focus:outline-none ${
                    selectedConversationId === id
                      ? 'bg-purple-700 text-white'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  대화 {id + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t border-gray-300">
        <button
          onClick={onNewConversation}
          className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          + 새로운 대화
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
