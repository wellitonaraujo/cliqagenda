"use client"


import { hoursConfig } from "@/config/hoursConfig";
import { useCollaborator } from "@/context/CollaboratorContext";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { Appointment } from "@/types/Appointment";
import { SelectedSlot } from "@/types/SelectedSlot";
import { addDays, formatDate } from "date-fns";
import { useState } from "react";

export function useHomeLogic() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
    const [expandedId, setExpandedId] = useState<string | number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const formattedDate = formatDate(selectedDate, "yyyy-MM-dd");
    const timeSlots = useTimeSlots(formattedDate, hoursConfig);
      const {collaborators , fetchCollaborators} = useCollaborator();
  
      const handleDateChange = (days: number) => {
        const newDate = addDays(selectedDate, days);
        setSelectedDate(newDate);
        fetchCollaborators();
      };
  
    const handleSelectSlot = (collaboratorId: number, index: number) => {
      setSelectedSlot({ collaboratorId, timeSlotIndex: index });
    };
  
    const handleUpdateStatus = (status: string) => {
      if (!selectedAppointment) return;
      // atualize o status no backend ou estado
    };
  
    const handleDeleteAppointment = () => {
      if (!selectedAppointment) return;
      // remova o agendamento
    };
  
    return {
      selectedDate,
      appointments,
      collaborators,
      timeSlots,
      handleDateChange,
      handleSelectSlot,
      selectedSlot,
      expandedId,
      setExpandedId,
      modalOpen,
      setModalOpen,
      selectedAppointment,
      setSelectedAppointment,
      handleUpdateStatus,
      handleDeleteAppointment,
    };
  }
  