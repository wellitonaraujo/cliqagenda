export function findClosestSlot(hora: string | null | undefined, timeSlots?: string[]): string | null {
  if (!hora) {
    console.warn('findClosestSlot: hora está indefinida');
    return null;
  }
  if (!timeSlots || timeSlots.length === 0) {
    console.warn('findClosestSlot: timeSlots vazio ou indefinido');
    return null;
  }

  // Conversor de string "HH:mm" para minutos totais
  const toMinutes = (t: string): number | null => {
    if (!t) return null;
    const parts = t.split(':');
    if (parts.length !== 2) return null;

    const [hStr, mStr] = parts;
    const h = Number(hStr);
    const m = Number(mStr);

    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;

    return h * 60 + m;
  };

  const target = toMinutes(hora);
  if (target === null) {
    console.warn(`findClosestSlot: hora inválida '${hora}'`);
    return null;
  }

  let closestSlot: string | null = null;
  let minDiff = Infinity;

  for (const slot of timeSlots) {
    const slotMinutes = toMinutes(slot);
    if (slotMinutes === null) {
      console.warn(`findClosestSlot: slot inválido '${slot}' ignorado`);
      continue;
    }
    const diff = Math.abs(slotMinutes - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestSlot = slot;
    }
  }

  return closestSlot;
}
