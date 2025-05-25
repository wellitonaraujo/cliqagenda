// hooks/useSchedulePage.ts
import { useState, useEffect, useRef } from 'react';
import { useAppointments } from '@/context/AppointmentsProvider';
import { useCollaborator } from '@/context/CollaboratorContext';
import { useHorarios } from '@/context/HoursProvider';
import { useRouter } from 'next/navigation';
import { normalizeDayName } from '../../utils/normalizeDayName';


export function useSchedulePage() {
  const { appointments, fetchAppointments } = useAppointments();
  const { collaborators } = useCollaborator();
  const { hours } = useHorarios();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [minCols, setMinCols] = useState(4);
  const scrollRef = useRef<HTMLDivElement>(null);

  const shortDayName = selectedDate.toLocaleDateString('pt-BR', { weekday: 'short' });
  const dayName = normalizeDayName(shortDayName);
  const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

  const appointmentsOfTheDay = appointments.filter(
    (appointment) => appointment.data === formattedSelectedDate
  );

  function convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function generateTimeSlots(day: string) {
    const config = hours[day];
    if (!config) return [];

    return config.ranges.flatMap((range) => {
      const start = convertToMinutes(range.start);
      const end = convertToMinutes(range.end);
      const times = [];

      for (let t = start; t < end; t += 15) {
        const hour = String(Math.floor(t / 60)).padStart(2, '0');
        const minute = String(t % 60).padStart(2, '0');
        times.push({ id: t, label: `${hour}:${minute}` });
      }

      return times;
    });
  }

  function handleDayChange(days: number) {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  }

  useEffect(() => {
    fetchAppointments({ date: formattedSelectedDate });
  }, [formattedSelectedDate]);

  useEffect(() => {
    function updateMinCols() {
      const cols = Math.floor(window.innerWidth / 180);
      setMinCols(cols > 0 ? cols : 1);
    }
    updateMinCols();
    window.addEventListener('resize', updateMinCols);
    return () => window.removeEventListener('resize', updateMinCols);
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    handleDayChange,
    formattedSelectedDate,
    appointmentsOfTheDay,
    collaborators,
    generateTimeSlots,
    dayName,
    scrollRef,
    minCols,
    router
  };
}
