export function findClosestSlot(hora: string, timeSlots: string[]) {

  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const target = toMinutes(hora);

  let closestSlot = timeSlots[0];
  let minDiff = Math.abs(toMinutes(timeSlots[0]) - target);

  for (const slot of timeSlots) {
    const diff = Math.abs(toMinutes(slot) - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestSlot = slot;
    }
  }

  return closestSlot;
}
