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
        const parsedHours = JSON.parse(stored);
        // Se algum dia estiver com `open: false`, ele vai forçar todos os dias a estarem abertos
        const allOpen = Object.keys(parsedHours).every(day => parsedHours[day].open === true);
        if (allOpen) {
          return parsedHours;
        }
      }
    }

    // Inicializa todos os dias como abertos por padrão
    return Object.fromEntries(
      daysOfWeek.map((day) => [
        day,
        {
          open: true, // Todos os dias começam abertos
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
