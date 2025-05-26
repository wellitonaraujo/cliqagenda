'use client';

import { useAppointments } from "@/context/AppointmentsProvider";
import { FiChevronLeft, FiChevronRight, FiMoreVertical } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import Image from "next/image";
import { useCollaborator } from "@/context/CollaboratorContext";
import { DiaSemana, Horario, useBusiness } from "@/context/BusinessContext";
import { isValid, parse } from "date-fns";

export default function Home() {
  const { appointments, fetchAppointments, removeAppointment } = useAppointments();
  const { collaborators } = useCollaborator();
  const { horarios } = useBusiness();

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  const [minCols, setMinCols] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState<{ collaboratorId: number; timeSlotIndex: number } | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

 const horarioDoDia = horarios?.find(h => h.diaSemana === diaSemana);

 const labels = horarioDoDia ? generateTimeSlots(horarioDoDia) : [];

 const timeSlots = labels.map((label, index) => ({ id: index, label }));

 const handleDayChange = (days: number) => {
  setSelectedDate(prev => {
    const newDate = new Date(prev);
    newDate.setDate(prev.getDate() + days);
    newDate.setHours(0, 0, 0, 0); // garantir meia-noite
    return newDate;
  });
};
const formatDate = (input: string | Date) => {
  const d = new Date(input);
  return d.toLocaleDateString('pt-BR');
};

const parseAppointmentDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  const fullYear = year.length === 2 ? `20${year}` : year;
  return new Date(Number(fullYear), Number(month) - 1, Number(day));
};

const appointmentsOfTheDay = appointments.filter(a => {
  const appointmentDate = parseAppointmentDate(a.data);
  return formatDate(appointmentDate) === formatDate(selectedDate);
});

  const getSlotIndex = (time: string, timeSlots: { id: number; label: string }[]) => {
    return timeSlots.findIndex((slot) => slot.label === time);
  };
  
  function parseDurationToMinutes(duration: number): number {
    return duration;
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
    console.log('Lista de agendamentos:', appointments);
  }, [appointments]);

  useEffect(() => {
    fetchAppointments()
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
                className="h-10 w-10 flex items-center justify-center border text-gray-400 border-gray-200 bg-gray-50 rounded-md"
              >
                <FiChevronLeft size={20} />
              </button>

              <span className="h-10 flex text-[#034D82] items-center justify-center border border-gray-200 bg-gray-50 px-4 rounded-md text-sm font-medium">
                {selectedDate.toLocaleDateString('pt-BR')}
              </span>

              <button
                onClick={() => handleDayChange(1)}
                className="h-10 w-10 flex items-center justify-center border text-gray-400 border-gray-200 bg-gray-50 rounded-md"
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
            {timeSlots.map(({ label }, index) => (
              <div key={label} className="h-10 flex justify-end">
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
            (a) => a.colaborador.id === collab.id
          ).length;
          
                return (
                  <div
                    key={`header-${collab.id ?? index}`}
                    className="min-w-[220px] h-[40px] flex items-center justify-between px-3 bg-gray-50 text-xs font-medium text-gray-500"
                  >
                    {/* Foto + Nome */}
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-400">
                        <Image
                          src="/image.png"
                          alt="foto de perfil"
                          width={40}
                          height={40}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="truncate max-w-[110px] text-gray-500">{collab.nome}</span>
                    </div>

                    {/* Contador */}
                    <div className="w-6 h-6 min-w-6 min-h-6 rounded-full text-[#034D82] text-[12px] flex items-center justify-center">
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
                  .filter((a) => a.colaborador.id === collab.id)
                  .map((a) => {
                    const index = getSlotIndex(a.hora, timeSlots);
                    if (index === -1) return null;
                    
                    const top = index * 40;
                    const durationInMinutes = parseDurationToMinutes(a.duracaoMin);
                    const height = (durationInMinutes / 30) * 40;

                    const isShort = height <= 700;
                    const isExpanded = expandedId === a.id;
                    const displayHeight = isShort && isExpanded ? 100 : height;

                    return (
                      <div
                        key={a.id}
                        className={`absolute left-1 right-0 shadow-md rounded overflow-hidden bg-[#F5FCFF] border-l-4 transition-all duration-300 cursor-pointer
                          ${isExpanded ? 'z-30' : 'z-10'}`}
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
                            <p className="font-semibold text-xs">{a.cliente.nome}</p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
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
                            <p className="text-xs text-gray-400 ">
                              {a.servico.nome} às {a.hora}
                            </p>
                            <p className="text-xs text-gray-400">R$ {a.preco}</p>
                            {a.status && (
                              <p className="text-xs text-[#00AEEF] mt-2">{a.status}</p>
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
      </div>
    </div>
  );
}