export const generateDurations = (): string[] => {
    const durations: string[] = [];
    const startMinutes = 15;
    const endMinutes = 8 * 60;
  
    for (let minutes = startMinutes; minutes <= endMinutes; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
  
      let label = '';
      if (hours > 0) {
        label += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        if (remainingMinutes > 0) {
          label += ` e ${remainingMinutes} minutos`;
        }
      } else {
        label = `${remainingMinutes} minutos`;
      }
  
      durations.push(label);
    }
  
    return durations;
  };