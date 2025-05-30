"use client";

import { useAppointments } from "@/context/AppointmentsProvider";
import { formatDate, parseAppointmentDate } from "../utils/date";
import { useCollaborator } from "@/context/CollaboratorContext";
import { useScheduleLogic } from "../hooks/useScheduleLogic";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useHomePage() {
  const { updateAppointmentStatus, fetchAppointments, removeAppointment } = useAppointments();

  const { collaborators } = useCollaborator();
  const router = useRouter();

  const {
    selectedDate,
    handleDayChange,
    timeSlots,
    appointments,
    minCols,
    setMinCols,
  } = useScheduleLogic();

  const COL_WIDTH = 180;

  const [status, setStatus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ collaboratorId: number; timeSlotIndex: number } | null>(null);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function updateMinCols() {
      const cols = Math.floor(window.innerWidth / COL_WIDTH);
      setMinCols(cols > 0 ? cols : 1);
    }

    updateMinCols();
    window.addEventListener("resize", updateMinCols);
    return () => window.removeEventListener("resize", updateMinCols);
  }, []);
 
  useEffect(() => {
    async function load() {
      setLoading(true);
      await fetchAppointments();
      setLoading(false);
    }
    load();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setStatus(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (selectedAppointment) {
      try {
        await updateAppointmentStatus(selectedAppointment.id, newStatus);
        setStatus(newStatus);
        handleModalClose();
          await fetchAppointments();
      } catch (err) {
        toast.error("Erro ao atualizar status:");
      }
    }
  };

  const handleRemoveAppointment = () => {
    if (selectedAppointment) {
      removeAppointment(selectedAppointment.id);
      handleModalClose();
    }
  };

  const goToNewAppointment = () => {
    router.push("/scheduling");
  };

  const openModal = (a: typeof appointments[0]) => {
    setSelectedAppointment(a);
    setModalOpen(true);
  };

  

const appointmentsOfTheDay = useMemo(() => {
  return appointments.filter((a) => {
    const appointmentDate = parseAppointmentDate(a.data);
    return formatDate(appointmentDate) === formatDate(selectedDate);
  });
}, [appointments, selectedDate]);


  return {
    selectedDate,
    handleDayChange,
    appointmentsOfTheDay,
    timeSlots,
    collaborators,
    minCols,
    selectedSlot,
    setSelectedSlot,
    expandedId,
    setExpandedId,
    modalOpen,
    handleModalClose,
    handleStatusChange,
    handleRemoveAppointment,
    openModal,
    goToNewAppointment,
    loading,
  };
}
