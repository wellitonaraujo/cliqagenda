import { create } from 'zustand';

type AppointmentStore = {
  shouldRefetch: boolean;
  triggerRefetch: () => void;
  resetRefetch: () => void;
};

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  shouldRefetch: false,
  triggerRefetch: () => set({ shouldRefetch: true }),
  resetRefetch: () => set({ shouldRefetch: false }),
}));
