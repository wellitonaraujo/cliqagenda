export const normalizeDayName = (shortDayName: string): string => {
  const dayMap = {
    'seg': 'segunda',
    'ter': 'terça',
    'qua': 'quarta',
    'qui': 'quinta',
    'sex': 'sexta',
    'sáb': 'sábado',
    'dom': 'domingo'
  };
  return dayMap[shortDayName.toLowerCase()] || shortDayName;
};
