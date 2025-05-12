import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'business_hours';
const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

type TimeRange = { start: string; end: string };
type HoursType = Record<string, { open: boolean; ranges: TimeRange[] }>;

type HorariosContextType = {
  hours: HoursType;
  setHours: React.Dispatch<React.SetStateAction<HoursType>>;
};

const HorariosContext = createContext<HorariosContextType | undefined>(undefined);

export const HorariosProvider = ({ children }: { children: React.ReactNode }) => {

const [hours, setHours] = useState<HoursType>(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedHours = JSON.parse(stored);
        return parsedHours;
      } catch (error) {
        console.error('Erro ao fazer parse dos horários:', error);
      }
    }
  }

  return Object.fromEntries(
    daysOfWeek.map((day) => [
      day,
      {
        open: true,
        ranges: [{ start: '08:00', end: '20:00' }],
      },
    ])
  );
  });

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hours));
}, [hours]);

  return (
    <HorariosContext.Provider value={{ hours, setHours }}>
      {children}
    </HorariosContext.Provider>
  );
};

export const useHorarios = () => {
  const context = useContext(HorariosContext);
  if (!context) throw new Error('useHorarios must be used within a HorariosProvider');
  return context;
};
