const dayMap = {
  seg: 'segunda',
  ter: 'terça',
  qua: 'quarta',
  qui: 'quinta',
  sex: 'sexta',
  sáb: 'sábado',
  dom: 'domingo',
} as const;

type ShortDayName = keyof typeof dayMap;

export const normalizeDayName = (shortDayName: string): string => {
  const key = shortDayName.toLowerCase() as ShortDayName;
  return dayMap[key] || shortDayName;
};
