'use client';

import { normalizeDayName } from "../../../../../utils/normalizeDayName";
import { useAppointments } from "@/context/AppointmentsProvider";
import { FiChevronLeft, FiChevronRight, FiHelpCircle, FiMoreVertical, FiTrash2, FiUserX, FiXCircle } from "react-icons/fi";
import { useHorarios } from "@/context/HoursProvider";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import { useCollaborators } from "@/context/CollaboratorContext";
import Image from "next/image";

export default function Home() {
  const { appointments, updateAppointment, removeAppointment } = useAppointments();
  const { collaborators } = useCollaborators();

  const { hours } = useHorarios();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  const [minCols, setMinCols] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState<{ collaboratorId: string; timeSlotIndex: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const COL_WIDTH = 180;

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

  const getSlotIndex = (time: string, timeSlots: { id: number; label: string }[]) => {
    return timeSlots.findIndex((slot) => slot.label === time);
  };
  
  function parseDurationToMinutes(duration: string): number {
    const horasMatch = duration.match(/(\d+)\s*hora/);
    const minutosMatch = duration.match(/(\d+)\s*minuto/);
  
    const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;
  
    return horas * 60 + minutos;
  }
  
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

  const countAppointments = (collaboratorId: string) =>
    appointmentsOfTheDay.filter(a => a.collaboratorId === collaboratorId).length;  

  useEffect(() => {
    function updateMinCols() {
      const cols = Math.floor(window.innerWidth / COL_WIDTH);
      setMinCols(cols > 0 ? cols : 1);
    }
    updateMinCols();

    window.addEventListener('resize', updateMinCols);
    return () => window.removeEventListener('resize', updateMinCols);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-30 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Header />
          </div>
        </div>
      </div>

      <div className="sticky top-15 z-20 bg-white p-4 flex justify-between items-start md:items-center">
        {/* Container: botões + texto "agendamentos" */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {/* Linha com botões e texto no desktop */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
            {/* Botões */}
            <div className="flex items-center gap-2 text-primary font-medium">
              <button
                onClick={() => handleDayChange(-1)}
                className="h-10 w-10 flex items-center justify-center border text-[#034D82] border-gray-100 bg-gray-50 rounded-md shadow-sm"
              >
                <FiChevronLeft size={20} />
              </button>

              <span className="h-10 flex text-[#034D82] items-center justify-center border border-gray-100 bg-gray-50 px-4 rounded-md text-sm font-medium shadow-sm">
                {selectedDate.toLocaleDateString('pt-BR')}
              </span>

              <button
                onClick={() => handleDayChange(1)}
                className="h-10 w-10 flex items-center justify-center border text-[#034D82] border-gray-100 bg-gray-50 rounded-md shadow-sm"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

            {/* Texto de agendamentos */}
            <span className="text-sl text-[#034D82] text-center md:text-left pt-4 md:pt-0">
              {appointmentsOfTheDay.length === 0
                ? 'Nenhum agendamento'
                : appointmentsOfTheDay.length === 1
                ? '1 agendamento'
                : `${appointmentsOfTheDay.length} agendamentos`}
            </span>
          </div>
        </div>

        {/* Botão à direita */}
        <div className="ml-auto " onClick={() => router.push('/scheduling')}>
          <Button>Novo agendamento</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-3 pr-0 pb-6 pl-6">
        <div className="flex w-full min-w-full">
          {/* Coluna de horários */}
          <div className="flex flex-col w-10 pr-2">
            <div className="h-[32px]" />
            {timeSlots.map(({ id, label }, index) => (
              <div key={id} className="h-10 flex justify-end">
                {index % 2 === 0 && label && (
                  <span className="text-sm text-gray-400 leading-none">{label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Colunas dos colaboradores + colunas vazias para preencher */}
          <div className="overflow-x-auto relative flex-1">
            {/* Cabeçalho fixo */}
            <div className="flex sticky top-0 z-10 bg-white min-w-full">
              {collaborators.map((collab, index) => {
                const count = appointmentsOfTheDay.filter(
                  (a) => a.collaboratorId === collab.id
                ).length;

                return (
                  <div
                    key={`header-${collab.id ?? index}`}
                    className="min-w-[220px] h-[40px] flex items-center justify-between px-3 border-gray-300 border-b-1 bg-gray-50 text-xs font-medium text-gray-500"
                  >
                    {/* Foto + Nome */}
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-[#00AEEF]">
                        <Image
                          src="/eu.svg"
                          alt="foto de perfil"
                          width={40}
                          height={40}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="truncate max-w-[110px]">{collab.name}</span>
                    </div>

                    {/* Contador redondo */}
                    <div className="w-6 h-6 min-w-6 min-h-6 rounded-full text-[#034D82] text-[10px] flex items-center justify-center">
                      {count}
                    </div>
                  </div>
                );
              })}

              {/* Colunas vazias para preencher */}
              {Array(Math.max(0, minCols - collaborators.length))
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`empty-header-${i}`}
                    className="min-w-[220px] h-[40px] border-gray-200 border-b-1 bg-gray-200"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(-45deg, #f9fafb 0px, #f9fafb 10px, #f3f4f6 10px, #f3f4f6 20px)',
                    }}
                  />
                ))}
            </div>

            {/* Grade de horários */}
            <div className="flex w-full min-w-full">
              {collaborators.map((collab, index) => (
                <div
                  key={`body-${collab.id ?? index}`}
                  className="flex flex-col border-l border-gray-200 min-w-[220px] flex-1 relative"
                >
                  {timeSlots.map(({ label }, index) => {
                    const isSelected =
                      selectedSlot?.collaboratorId === collab.id &&
                      selectedSlot?.timeSlotIndex === index;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSlot(null);
                          } else {
                            setSelectedSlot({ collaboratorId: collab.id, timeSlotIndex: index });
                          }
                        }}
                        
                        className={`h-10 border-b border-gray-200 group flex items-center justify-center cursor-pointer ${
                          isSelected ? 'bg-[#EFFBFF]' : ''
                        }`}
                      >
                        <span
                          className={`text-xs font-bold text-[#00AEEF] ${
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
                    const index = getSlotIndex(a.time, timeSlots);
                    if (index === -1) return null;

                    const top = index * 40;
                    const durationInMinutes = parseDurationToMinutes(a.duration);
                    const height = (durationInMinutes / 30) * 40;

                    const isShort = height <= 50;
                    const isExpanded = expandedId === a.id;
                    const displayHeight = isShort && isExpanded ? 100 : height;

                    return (
                      <div
                        key={a.id}
                        className="absolute left-1 right-0 shadow-md rounded z-10 overflow-hidden bg-[#EFFBFF] border-l-4 transition-all duration-300 cursor-pointer"
                        style={{
                          top,
                          height: displayHeight,
                          borderLeftColor: '#00AEEF',
                        }}
                        onClick={() => {
                          if (!isShort) return;
                          setExpandedId((prev) => (prev === a.id ? null : a.id));
                        }}
                      >
                        <div className="pl-2 pt-0.5 text-[#034D82] h-full flex flex-col justify-between">
                          {/* Cabeçalho: nome + botão */}
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-xs">{a.customerName}</p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // evita disparar o clique no card
                                setSelectedAppointment(a);
                                setModalOpen(true);
                              }}
                              className="text-[#034D82] pr-1"
                            >
                              <FiMoreVertical size={18} />
                            </button>
                          </div>

                          {/* Conteúdo clicável */}
                          <div>
                            <p className="text-xs">
                              {a.serviceName} às {a.time}
                            </p>
                            <p className="text-xs">R$ {a.price}</p>
                            {a.status && (
                              <p className="text-xs text-gray-600 mt-2">{a.status}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Colunas vazias para preencher */}
              {Array(Math.max(0, minCols - collaborators.length))
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`empty-body-${i}`}
                    className="flex flex-col border-l border-gray-200 min-w-[220px] flex-1"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(-45deg, #f9fafb 0px, #f9fafb 10px, #f3f4f6 10px, #f3f4f6 20px)',
                    }}
                  >
                    {timeSlots.map(({ label }, index) => (
                      <div key={index} className="h-10 border-b border-gray-200" />
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Modal de status (simplificado) */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/2 z-30">
            <div className="bg-white w-80 p-5 rounded-xl shadow-2xl shadow-black/30">
              <h2 className="font-semibold text-lg text-center text-gray-800">Alterar Status</h2>

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

