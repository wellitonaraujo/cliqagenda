import { HoursConfig } from "@/hooks/useTimeSlots";
import { TimeSlot } from "../src/types/timeSlots";

export const convertToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  
  export const generateTimeSlots = (day: string, hoursConfig: HoursConfig | undefined): TimeSlot[] => {
    if (!hoursConfig) return [];
    
    const slots: TimeSlot[] = hoursConfig.ranges.flatMap((range) => {
      const start = convertToMinutes(range.start);
      const end = convertToMinutes(range.end);
      const times: TimeSlot[] = [];
      
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