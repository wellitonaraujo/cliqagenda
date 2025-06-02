export const formatDate = (input: string | Date) => {
    const d = new Date(input);
    return d.toLocaleDateString('pt-BR');
  };
  
export const parseAppointmentDate = (dateStr: string) => {
  const isoFormat = /^\d{4}-\d{2}-\d{2}T/;

  if (isoFormat.test(dateStr)) {
    return new Date(dateStr);
  }

  const regex = /^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/;
  const match = regex.exec(dateStr);

  if (!match) {
    throw new Error(`Formato inválido para dateStr: "${dateStr}"`);
  }

  const [, day, month, year] = match;

  const fullYear = year.length === 2 ? `20${year}` : year;

  return new Date(Number(fullYear), Number(month) - 1, Number(day));
};


  export const parseDurationToMinutes = (duration: number): number => duration;
  