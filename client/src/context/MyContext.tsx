"use client"

import { createContext, useState, useContext, ReactNode } from 'react';

interface MyContextType {
  state: string;
  setState: (state: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
  const [state, setState] = useState<string>('Hello World');

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
