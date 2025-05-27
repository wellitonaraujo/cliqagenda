export function findClosestSlot(hora: string, timeSlots: string[]) {
  if (!hora) {
    throw new Error('Hora está indefinida');
  }
  if (!timeSlots || timeSlots.length === 0) {
    throw new Error('timeSlots vazio ou indefinido');
  }

  const toMinutes = (t: string) => {
    if (!t) throw new Error('time string undefined');
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
