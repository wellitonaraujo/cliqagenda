export interface Option {
  value: string | number;
  label: string | number;
}


export function generateDurationOptions(): Option[] {
  const options: Option[] = [];

  for (let minutes = 15; minutes <= 8 * 60; minutes += 15) {
    let label = '';
    if (minutes < 60) {
      label = `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      label = mins === 0 ? `${hours} hora${hours > 1 ? 's' : ''}` : `${hours}h ${mins}min`;
    }
    options.push({ value: minutes, label });
  }

  return options;
}
