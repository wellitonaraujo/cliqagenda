import { DiaSemana, Horario, useBusiness } from '@/context/BusinessContext';
import { useAppointments } from '@/context/AppointmentsProvider';
import { useEffect, useState } from 'react';

export function useScheduleLogic() {
  const { horarios } = useBusiness();
  const { appointments, fetchAppointments } = useAppointments();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const [minCols, setMinCols] = useState(4);

  const COL_WIDTH = 180;

  function getDiaSemanaFromDate(date: Date): DiaSemana {
    const map = [
      DiaSemana.DOMINGO,
      DiaSemana.SEGUNDA,
      DiaSemana.TERCA,
      DiaSemana.QUARTA,
      DiaSemana.QUINTA,
      DiaSemana.SEXTA,
      DiaSemana.SABADO,
    ];
    return map[date.getDay()];
  }

  function generateTimeSlots(horario: Horario): string[] {
    if (!horario.aberto || !horario.horaAbertura || !horario.horaFechamento) return [];

    const [startHour, startMinute] = horario.horaAbertura.split(':').map(Number);
    const [endHour, endMinute] = horario.horaFechamento.split(':').map(Number);

    const slots = [];
    let current = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);

    while (current <= end) {
      const hourStr = current.getHours().toString().padStart(2, '0');
      const minuteStr = current.getMinutes().toString().padStart(2, '0');
      slots.push(`${hourStr}:${minuteStr}`);
      current.setMinutes(current.getMinutes() + 30);
    }
    return slots;
  }

  const diaSemana = getDiaSemanaFromDate(selectedDate);
  const horarioDoDia = horarios?.find((h) => h.diaSemana === diaSemana);
  const labels = horarioDoDia ? generateTimeSlots(horarioDoDia) : [];
  const timeSlots = labels.map((label, index) => ({ id: index, label }));

  function handleDayChange(days: number) {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    });
  }

  useEffect(() => {
    function updateMinCols() {
      const cols = Math.floor(window.innerWidth / COL_WIDTH);
      setMinCols(cols > 0 ? cols : 1);
    }
    updateMinCols();

    window.addEventListener('resize', updateMinCols);
    return () => window.removeEventListener('resize', updateMinCols);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, []);
  

  return {
    selectedDate,
    setSelectedDate,
    handleDayChange,
    timeSlots,
    labels,
    appointments,
    minCols,
    setMinCols,
  };
}
