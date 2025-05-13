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
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { generateDurations } from '../../../../../utils/generateDurations';
import { useCollaborators } from '@/context/CollaboratorContext';
import { v4 as uuidv4 } from 'uuid';

export default function AgendamentoForm() {
  const router = useRouter();
  const { hours } = useHorarios();
  const { customers } = useCustomers();
  const { collaborators } = useCollaborators();
  const { services } = useServices();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedCollaboratorId, setSelectedCollaboratorId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const formattedDay = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const durations = generateDurations();

  const { addAppointment } = useAppointments();

  const getDayName = (date: Date) => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return daysOfWeek[date.getDay()];
  };

  const isDateAvailable = (date: Date) => {
    const dayName = getDayName(date);
    return hours[dayName]?.open ?? false;
  };

  const handleSubmit = () => {
    if (!selectedCustomerId || !selectedServiceId || !selectedCollaboratorId || !selectedDate) {
      alert('Preencha todos os campos!');
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomerId);
    const service = services.find(s => s.id === selectedServiceId);
    const collaborator = collaborators.find(c => c.id === selectedCollaboratorId);

    if (!customer || !service || !collaborator) return;

    const appointmentData = {
      id: uuidv4(),
      customerName: customer.name,
      serviceId: service.id,
      serviceName: service.name,
      collaboratorId: collaborator.id,
      collaboratorName: collaborator.name,
      day: formattedDay,
      duration: service.duration,
      price,
    };

    console.log('Agendamento confirmado:', appointmentData);

    addAppointment(appointmentData);

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
          <h1 className="text-xl font-semibold mx-auto">Agendamento</h1>
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
            onChange={e => {
              const id = e.target.value;
              setSelectedServiceId(id);

              const selectedService = services.find(s => s.id === id);
              if (selectedService) {
                setDuration(selectedService.duration);
                setPrice(selectedService.price.toString());
              } else {
                setDuration('');
                setPrice('');
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Selecione um serviço</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Duração</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">Selecione a duração</option>
            {durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
       {/* Colaborador */}
        <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Colaborador</label>
            <select
              value={selectedCollaboratorId}
              onChange={e => setSelectedCollaboratorId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Selecione um colaborador</option>
              {collaborators.map(colab => (
                <option key={colab.id} value={colab.id}>{colab.name}</option>
              ))}
            </select>
        </div>
        {/* Preço e Data na mesma linha */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:gap-4">
          {/* Preço */}
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium mb-2">Preço</label>
            <input
              type="text"
              value={price}
              onChange={e => setPrice(formatCurrency(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="R$ 0,00"
            />
          </div>

          {/* Data */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <label className="block text-sm font-medium mb-2">Selecione um dia</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              filterDate={isDateAvailable}
              placeholderText="Escolha um dia disponível"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-auto mb-20">
          <button
            onClick={() => router.back()}
            className="text-gray-600 font-medium hover:underline"
          >
            Cancelar
          </button>
          <div onClick={handleSubmit}>
            <Button>
              Confirmar Agendamento
            </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
