'use client';

import { CollaboratorScheduleColumn } from "./ui/CollaboratorScheduleColumn";
import { CollaboratorsHeader } from "./ui/CollaboratorsHeader";
import AppointmentsHeader from "./ui/AppointmentsHeader";
import { AppointmentModal } from "./ui/AppointmentModal";
import TimeSlotsColumn from "./ui/TimeSlotsColumn";
import { useHomePage } from "./hooks/useHomePage";
import { EmptyColumns } from "./ui/EmptyColumns";
import HomeHeader from "./ui/Header";
import { useEffect } from "react";
import NowLine from "./ui/NowLine";

export default function Home() {
  const {
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
    horarioDoDia
  } = useHomePage();
  

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HomeHeader />
      <AppointmentsHeader
        selectedDate={selectedDate}
        onDateChange={handleDayChange}
        appointmentsCount={appointmentsOfTheDay.length}
        onNewAppointment={goToNewAppointment}
        loading={loading}
      />
      <div className="flex-1 overflow-y-auto pt-3 pr-0 pb-6 pl-6">
        <div className="flex w-full min-w-full">
          <TimeSlotsColumn timeSlots={timeSlots} />
          <div className="overflow-x-auto relative flex-1">
            <CollaboratorsHeader
              collaborators={collaborators}
              appointmentsOfTheDay={appointmentsOfTheDay}
              minCols={minCols}
             isLoadingCounts={loading}
            />
             <NowLine 
              timeSlots={timeSlots} 
              startTime={horarioDoDia?.horaAbertura ?? "00:00"} 
              endTime={horarioDoDia?.horaFechamento ?? "23:59"} 
              offsetTop={-20}
            />

            <div className="flex w-full min-w-full">
              {collaborators.map((collab, index) => (
                <CollaboratorScheduleColumn
                  key={`body-${collab.id ?? index}`}
                  collaborator={collab}
                  timeSlots={timeSlots}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                  appointmentsOfTheDay={appointmentsOfTheDay}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  onOpenModal={openModal}
                />
              ))}
              <EmptyColumns
                count={Math.max(0, minCols - collaborators.length)}
                timeSlotsLength={timeSlots.length}
              />
            </div>
          </div>
        </div>
        <AppointmentModal
          open={modalOpen}
          onClose={handleModalClose}
          onRemove={handleRemoveAppointment}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
