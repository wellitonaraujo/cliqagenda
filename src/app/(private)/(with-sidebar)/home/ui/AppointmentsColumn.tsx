import { findClosestSlot } from '../utils/findClosestSlot';
import { getSlotIndex } from '../utils/getSlotIndex';
import { AppointmentItem } from './AppointmentItem';
import { Appointment } from '@/types/Appointment';
import React from 'react';

interface AppointmentsColumnProps {
  collaboratorId: string | number;
  appointmentsOfTheDay: Appointment[];
  timeSlots: string[];
  expandedId: string | number | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | number | null>>;
  onOpenModal: (appointment: Appointment) => void;
}

export const AppointmentsColumn: React.FC<AppointmentsColumnProps> = ({
  collaboratorId,
  appointmentsOfTheDay,
  timeSlots,
  expandedId,
  setExpandedId,
  onOpenModal,
}) => {

  return (
    <>
     {appointmentsOfTheDay
      .filter((a) => a.colaborador.id === collaboratorId)
      .map((a) => {
        const closest = findClosestSlot(a.hora, timeSlots);
        if (!closest) return null;

        const index = getSlotIndex(closest, timeSlots);
        if (index === -1) return null;

        return (
          <AppointmentItem
            key={a.id}
            appointment={a}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            onOpenModal={onOpenModal}
          />
        );
      })}

    </>
  );
};

