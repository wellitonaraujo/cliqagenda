export const formatDate = (input: string | Date) => {
    const d = new Date(input);
    return d.toLocaleDateString('pt-BR');
  };
  
  export const parseAppointmentDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    const fullYear = year.length === 2 ? `20${year}` : year;
    return new Date(Number(fullYear), Number(month) - 1, Number(day));
  };
  
  export const parseDurationToMinutes = (duration: number): number => duration;
  