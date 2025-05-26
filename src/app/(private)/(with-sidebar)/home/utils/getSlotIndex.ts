export function getSlotIndex(hora: string, timeSlots: string[]) {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const appointmentMinutes = toMinutes(hora);
  const slotMinutes = timeSlots.map(toMinutes);

  let closestIndex = 0;
  let minDiff = Math.abs(slotMinutes[0] - appointmentMinutes);

  for (let i = 1; i < slotMinutes.length; i++) {
    const diff = Math.abs(slotMinutes[i] - appointmentMinutes);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
}
