'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHorarios } from '@/context/HoursProvider';
import { useCustomers } from '@/context/CustomersContext';
import { useServices } from '@/context/ServiceContext';
import Button from '@/componentes/Button';
import { HiArrowLeft } from 'react-icons/hi';
import { useAppointments } from '@/context/AppointmentsProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AgendamentoForm() {
  const router = useRouter();
  const { hours } = useHorarios();
  const { customers } = useCustomers();
  const { services } = useServices();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  const formattedDay = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  const { addAppointment } = useAppointments();

  const convertToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const getAvailableTimes = (day: string) => {
    const config = hours[day];
    if (!config || !config.open) return [];

    return config.ranges.flatMap(({ start, end }) => {
      const startMin = convertToMinutes(start);
      const endMin = convertToMinutes(end);
      const slots = [];

      for (let t = startMin; t < endMin; t += 60) {
        const hour = Math.floor(t / 60);
        const minute = t % 60;
        slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      }

      return slots;
    });
  };

  const getDayName = (date: Date) => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };
  
  const isDateAvailable = (date: Date) => {
    const dayName = getDayName(date);
    return hours[dayName]?.open ?? false;
  };

  const handleSubmit = () => {
    if (!selectedCustomerId || !selectedServiceId || !selectedDate || !selectedTime) {
      alert('Preencha todos os campos!');
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomerId);
    const service = services.find(s => s.id === selectedServiceId);

    if (!customer || !service) return;

    addAppointment({
      id: Date.now().toString(),
      customerName: customer.name,
      serviceName: service.name,
      day: formattedDay,
      time: selectedTime,
      duration: service.duration
    });

    alert('Agendamento realizado com sucesso!');
    router.push('/home');
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto b-white">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
          <HiArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold mx-auto">Novo Agendamento</h1>
      </div>

      {/* Cliente */}
      <div className="mb-4">
        <label className="block mb-1">Cliente</label>
        <select
          value={selectedCustomerId}
          onChange={e => setSelectedCustomerId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione um cliente</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>

      {/* Serviço */}
      <div className="mb-4">
        <label className="block mb-1">Serviço</label>
        <select
          value={selectedServiceId}
          onChange={e => setSelectedServiceId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione um serviço</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.duration}min - R${service.price}
            </option>
          ))}
        </select>
      </div>

      {/* Calendário para seleção de dia */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Selecione um dia</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTime('');
          }}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          filterDate={isDateAvailable}
          placeholderText="Escolha um dia disponível"
          className="border p-2 rounded w-full"
          dayClassName={(date) => {
            const dateStr = date.toISOString().split('T')[0];
            return hours[dateStr]?.open ? 'bg-green-100 text-green-800 font-semibold' : '';
          }}
        />

      </div>
      {selectedDate && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Horário disponível</label>
          <div className="flex flex-wrap gap-2">
            {getAvailableTimes(getDayName(selectedDate)).length === 0 ? (
              <p className="text-red-500">Nenhum horário disponível para este dia.</p>
            ) : (
              getAvailableTimes(getDayName(selectedDate)).map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 rounded border text-md transition ${
                    selectedTime === time
                      ? 'bg-[#7567E4] text-white border-green-500'
                      : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))
            )}
          </div>
        </div>
      )}
      <div onClick={handleSubmit}>
        <Button>Confirmar Agendamento</Button>
      </div>
    </div>
  );
}
