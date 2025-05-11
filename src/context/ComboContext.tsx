'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Combo = {
  id: string;
  name: string;
  services: { id: string; name: string }[];
  price: string;
  duration: string;
  professionals: string[];
};

type ComboContextType = {
  combos: Combo[];
  addCombo: (combo: Combo) => void;
  removeCombo: (id: string) => void;
};

const ComboContext = createContext<ComboContextType | undefined>(undefined);

const STORAGE_KEY = 'myapp_combos';

export function ComboProvider({ children }: { children: ReactNode }) {
  const [combos, setCombos] = useState<Combo[]>([]);

  useEffect(() => {
    const storedCombos = localStorage.getItem(STORAGE_KEY);
    if (storedCombos) {
      setCombos(JSON.parse(storedCombos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combos));
  }, [combos]);

  const addCombo = (combo: Combo) => {
    setCombos((prevCombos) => [...prevCombos, combo]);
  };

  const removeCombo = (id: string) => {
    setCombos((prevCombos) => prevCombos.filter((combo) => combo.id !== id));
  };

  return (
    <ComboContext.Provider value={{ combos, addCombo, removeCombo }}>
      {children}
    </ComboContext.Provider>
  );
}

export function useCombos() {
  const context = useContext(ComboContext);
  if (!context) {
    throw new Error('useCombos must be used within a ComboProvider');
  }
  return context;
}
