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
    return daysOfWeek[date.getDay()];
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
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo colaborador</h1>
        </div>
  
        {/* Cliente */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cliente</label>
          <select
            value={selectedCustomerId}
            onChange={e => setSelectedCustomerId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Selecione um cliente</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>

        {/* Serviço */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Serviço</label>
          <select
            value={selectedServiceId}
            onChange={e => setSelectedServiceId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Selecione um serviço</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - {service.duration} - R${service.price}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Selecione um dia</label>
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
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Horários */}
        {selectedDate && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Horários disponíveis</label>
            <div className="flex flex-wrap gap-3">
              {getAvailableTimes(getDayName(selectedDate)).length === 0 ? (
                <p className="text-red-500 text-sm">Nenhum horário disponível para este dia.</p>
              ) : (
                getAvailableTimes(getDayName(selectedDate)).map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg text-sm border transition font-medium ${
                      selectedTime === time
                        ? 'bg-violet-600 text-white border-violet-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
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
          <Button className="w-full py-3 text-white bg-violet-600 hover:bg-violet-700 transition rounded-lg">
            Confirmar Agendamento
          </Button>
        </div>
      </div>
    </div>
  );
}
