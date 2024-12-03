import React, { createContext, ReactNode, useContext, useState } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed flex items-center justify-center w-full h-screen z-50 bg-white/20">
      <div className="w-16 h-16 border-8 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
