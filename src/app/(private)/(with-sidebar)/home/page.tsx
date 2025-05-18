'use client';

import { normalizeDayName } from "../../../../../utils/normalizeDayName";
import { useAppointments } from "@/context/AppointmentsProvider";
import { FiChevronLeft, FiChevronRight, FiHelpCircle, FiTrash2, FiUserX, FiXCircle } from "react-icons/fi";
import { useHorarios } from "@/context/HoursProvider";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import { useCollaborators } from "@/context/CollaboratorContext";

export default function Home() {
  const { appointments, updateAppointment, removeAppointment } = useAppointments();
  const { hours } = useHorarios();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);

  const shortDayName = selectedDate.toLocaleDateString('pt-BR', { weekday: 'short' });

  const convertToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const generateTimeSlots = (day: string) => {
    const config = hours[day];
    if (!config) return [];    

    const slots = config.ranges.flatMap((range) => {
      const start = convertToMinutes(range.start);
      const end = convertToMinutes(range.end);
      const times = [];

      for (let t = start; t < end; t += 15) {
        const hour = Math.floor(t / 60);
        const minute = t % 60;
        const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push({ id: t, label });
      }

      return times;
    });

    return slots;
  };

  const dayName = normalizeDayName(shortDayName);
  const timeSlots = generateTimeSlots(dayName);


  const handleDayChange = (days: number) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };
  
  const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
  
  const appointmentsOfTheDay = appointments.filter(
    (appointment) => appointment.day === formattedSelectedDate
  );
  
  useEffect(() => {
    if (scrollRef.current && timeSlots.length > 0) {
      const itemHeight = 40;
      scrollRef.current.scrollTop = 4 * itemHeight;
    }
  }, [timeSlots]);

  useEffect(() => {
    console.log('Agendamentos no dia selecionado:', appointmentsOfTheDay);
  }, [appointmentsOfTheDay]);

  useEffect(() => {
  }, [appointmentsOfTheDay]);

  const getSlotIndex = (time: string) => {
    return timeSlots.findIndex((slot) => slot.label === time);
  };
  
  function parseDurationToMinutes(duration: string): number {
    const horasMatch = duration.match(/(\d+)\s*hora/);
    const minutosMatch = duration.match(/(\d+)\s*minuto/);
  
    const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;
  
    return horas * 60 + minutos;
  }

  const handleCardClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setStatus(appointment.status || null);
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setStatus(null);
  };
  
  const handleStatusChange = (newStatus: string) => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, {
        ...selectedAppointment,
        status: newStatus,
      });
      setStatus(newStatus);
      handleModalClose();
    }
   };
    
  const handleRemoveAppointment = () => {
    if (selectedAppointment) {
      removeAppointment(selectedAppointment.id);
      handleModalClose();
    }
  };

  const { collaborators } = useCollaborators();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-30 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Header />
          </div>
        </div>
      </div>
      <div className="sticky top-15 z-20 bg-white p-4 flex justify-between items-center">

        <div className="flex items-center gap-2 text-primary font-medium">
          <button onClick={() => handleDayChange(-1)}><FiChevronLeft size={20} /></button>
          <span>{selectedDate.toLocaleDateString('pt-BR')}</span>
          <button onClick={() => handleDayChange(1)}><FiChevronRight size={20} /></button>

          <span className="text-sm text-gray-500">
            {appointmentsOfTheDay.length === 0
              ? 'Nenhum agendamento'
              : appointmentsOfTheDay.length === 1
              ? '1 agendamento'
              : `${appointmentsOfTheDay.length} agendamentos`}
          </span>

        </div>
        <div className="ml-auto" onClick={() => router.push('/scheduling')}>
          <Button>Agendar</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex w-full min-w-full">
          {/* Coluna de horários + espaço para alinhar com cabeçalho */}
          <div className="flex flex-col w-10 pr-2">
            {/* Espaço vazio com a mesma altura do cabeçalho */}
            <div className="h-[40px]"></div>
            {timeSlots.map(({ id, label }, index) => (
              <div key={id} className="h-10 flex justify-end">
                {index % 2 === 0 && label && (
                  <span className="text-sm text-gray-800 leading-none">
                    {label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Colunas dos colaboradores + cabeçalho fixo */}
          <div className="overflow-x-auto relative">
            {/* Cabeçalho fixo com os nomes dos colaboradores */}
            <div className="flex sticky top-0 z-10 bg-white">
              {collaborators.map((collab, index) => (
                <div
                  key={`header-${collab.id ?? index}`}
                  className="min-w-[180px] h-[40px] flex items-center justify-center bg-[#f7f7f7] border-b border-gray-300 shadow text-sm font-medium text-gray-700 text-center"
                >
                  {collab.name}
                </div>
              ))}
            </div>

            {/* Grade de horários */}
            <div className="flex w-full">
              {collaborators.map((collab, index) => (
                <div
                  key={`body-${collab.id ?? index}`}
                  className="flex flex-col border-l border-gray-200 min-w-[180px] flex-1 relative"
                >
                  {timeSlots.map(({ label }, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className="h-10 border-b border-gray-200 group flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className={`text-xs font-bold text-[#09BDDD] ${
                            isSelected ? 'block' : 'hidden group-hover:block'
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}

                  {/* Agendamentos */}
                  {appointmentsOfTheDay
                    .filter((a) => a.collaboratorId === collab.id)
                    .map((a) => {
                      const index = getSlotIndex(a.time);
                      const top = index * 40;
                      const durationInMinutes = parseDurationToMinutes(a.duration);
                      const height = (durationInMinutes / 30) * 40;

                      return (
                        <div
                          onClick={() => handleCardClick(a)}
                          key={a.id}
                          className="absolute left-2 right-2 shadow-md rounded z-10 overflow-hidden bg-[#E3FBFF] border-l-4"
                          style={{ top, height, borderLeftColor: '#09BDDD' }}
                        >
                          <div className="p-2 text-[#18B7E7] h-full flex flex-col justify-between">
                            <div>
                              <p className="font-semibold text-sm">
                                {a.customerName}
                              </p>
                              <p className="text-sm">
                                {a.serviceName} às {a.time}
                              </p>
                              <p className="text-sm">R$ {a.price}</p>
                            </div>
                            {a.status && (
                              <p className="text-xs text-gray-600 mt-2">
                                {a.status}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de status */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-white w-80 p-5 rounded-xl shadow-2xl shadow-black/30">
              <h2 className="font-semibold text-lg text-center text-gray-800">
                Alterar Status
              </h2>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleStatusChange('Em entendimento')}
                  className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <FiHelpCircle className="text-gray-500" />
                  Em entendimento
                </button>
                <button
                  onClick={() => handleStatusChange('Cliente faltou')}
                  className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <FiUserX className="text-gray-500" />
                  Cliente faltou
                </button>
                <button
                  onClick={() => handleStatusChange('Cancelado')}
                  className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <FiXCircle className="text-gray-500" />
                  Cancelado
                </button>
                <button
                  onClick={handleRemoveAppointment}
                  className="w-full py-2 px-4 text-sm text-left text-red-500 hover:bg-red-50 transition rounded-md flex items-center gap-2"
                >
                  <FiTrash2 className="text-red-500" />
                  Remover
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleModalClose}
                  className="w-full py-2 bg-gray-200 text-sm font-medium rounded-md hover:bg-gray-300 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
