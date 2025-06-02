export function generateTimeSlots(start: string, end: string, intervalMinutes = 30) {
  const slots: string[] = [];
  
  // Converter "08:00" para Date
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  // Criar datas para manipular (data fictícia, só para cálculo)
  let current = new Date();
  current.setHours(startHour, startMinute, 0, 0);
  
  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);
  
  while (current <= endDate) {
    // Formatar de volta para "HH:mm"
    const hh = current.getHours().toString().padStart(2, '0');
    const mm = current.getMinutes().toString().padStart(2, '0');
    slots.push(`${hh}:${mm}`);
    
    // Incrementar intervalo
    current = new Date(current.getTime() + intervalMinutes * 60000);
  }
  
  return slots;
}
