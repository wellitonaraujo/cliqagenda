import { convertToMinutes } from '../../utils/timeUtils';
import { TimeSlot } from '../types/timeSlots';
import { useMemo } from 'react';

export type TimeRange = {
  start: string;
  end: string;
};

export type HoursConfig = {
  ranges: TimeRange[];
};

export type HoursConfigSimple = {
  startHour: number;
  endHour: number;
  interval: number;
}

export function useTimeSlots(day: string, hoursConfig: HoursConfig | undefined): TimeSlot[] {
  return useMemo(() => {
    if (!hoursConfig) return [];

    return hoursConfig.ranges.flatMap((range) => {
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
  }, [day, hoursConfig]);
}
