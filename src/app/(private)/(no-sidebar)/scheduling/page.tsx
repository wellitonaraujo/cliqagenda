'use client'

import { useEffect, useState } from 'react';
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
import Select from 'react-select';
import { customSelectStyles } from '../../../../../utils/customSelectStyles';

type OptionType = {
  label: string;
  value: string;
};

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
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const { addAppointment } = useAppointments();
  const durations = generateDurations();

  const formattedDay = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  const customerOptions = customers.map(c => ({ value: c.id, label: c.name }));
  const selectedCustomer = customerOptions.find(opt => opt.value === selectedCustomerId) || null;
  const serviceOptions = services.map(s => ({ value: s.id, label: s.name }));

  const generateTimeSlots = (start: string, end: string): string[] => {
    const times: string[] = [];
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
  
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
  
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
  
    while (startDate <= endDate) {
      const hours = startDate.getHours().toString().padStart(2, '0');
      const minutes = startDate.getMinutes().toString().padStart(2, '0');
      times.push(`${hours}:${minutes}`);
      startDate.setMinutes(startDate.getMinutes() + 15);
    }
  
    return times;
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
    if (!selectedCustomerId || !selectedServiceId || !selectedCollaboratorId || !selectedDate || !selectedTime) {
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
      duration,
      time: selectedTime,
      price,
    };

    console.log('Agendamento confirmado:', appointmentData);

    addAppointment(appointmentData);

    alert('Agendamento realizado com sucesso!');
    router.push('/home');
  };

    const handleServiceChange = (opt: OptionType | null) => {
      const id = opt?.value || '';
      setSelectedServiceId(id);
    
      const selectedService = services.find(s => s.id === id);
      if (selectedService) {
        setDuration(selectedService.duration);
        setPrice(selectedService.price.toString());
      } else {
        setDuration('');
        setPrice('');
      }
    };

    useEffect(() => {
      if (selectedCollaboratorId && selectedDate) {
        const collaborator = collaborators.find(c => c.id === selectedCollaboratorId);
    
        if (!collaborator) return;
    
        const dayName = getDayName(selectedDate);
        const daySchedule = collaborator.schedule?.[dayName];
    
        console.log("daySchedule:", daySchedule);
    
        if (
          daySchedule &&
          daySchedule.open &&
          Array.isArray(daySchedule.ranges) &&
          daySchedule.ranges.every(range => typeof range.start === 'string' && typeof range.end === 'string')
        ) {
          const slots = daySchedule.ranges.flatMap(range =>
            generateTimeSlots(range.start, range.end)
          );
          setAvailableTimes(slots);
        } else {
          setAvailableTimes([]);
        }
      }
    }, [selectedCollaboratorId, selectedDate, collaborators]);
  
  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Agendamento</h1>
        </div>
  
        {/* Cliente */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cliente</label>
          <Select
            isClearable={false}
            options={customerOptions}
            value={selectedCustomer}
            onChange={opt => setSelectedCustomerId(opt?.value || '')}
            placeholder="Selecione um cliente"
            classNames={customSelectStyles.classNames}
          />
        </div>
  
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:gap-4">
          {/* Serviço */}
          <div className="w-full md:w-2/3">
            <label className="block text-sm font-medium mb-2">Serviço</label>
            <Select
              options={serviceOptions}
              value={serviceOptions.find(opt => opt.value === selectedServiceId) || null}
              onChange={handleServiceChange}
              placeholder="Selecione um serviço"
              classNames={customSelectStyles.classNames}
            />
          </div>

          {/* Preço */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-2">Preço</label>
            <input
              type="text"
              value={price}
              readOnly
              onChange={e => setPrice(formatCurrency(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="R$ 0,00"
            />
          </div>
        </div>

        {/* Colaborador */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Colaborador</label>
          <Select
            options={collaborators.map(c => ({ value: c.id, label: c.name }))}
            value={
              collaborators
                .map(c => ({ value: c.id, label: c.name }))
                .find(opt => opt.value === selectedCollaboratorId) || null
            }
            onChange={opt => setSelectedCollaboratorId(opt?.value || '')}
            placeholder="Selecione um colaborador"
            classNames={customSelectStyles.classNames}
          />
        </div>
  
        {/* Data */}
        <div className="w-full md:w-1/2 mt-6 mb-6">
          <label className="block text-sm font-medium mb-2">Selecione um dia</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            filterDate={isDateAvailable}
            placeholderText="Escolha um dia disponível"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
  
        {/* Horário e duração */}
        {availableTimes.length > 0 && (
          <div className="mb-6 mt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Horário */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Horário</label>
                <Select
                  options={availableTimes.map(time => ({ value: time, label: time }))}
                  value={selectedTime ? { value: selectedTime, label: selectedTime } : null}
                  onChange={opt => setSelectedTime(opt?.value || '')}
                  placeholder="Selecione um horário"
                  classNames={customSelectStyles.classNames}
                />
              </div>
  
              {/* Duração */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Duração</label>
                <Select
                  options={durations.map(d => ({ value: d, label: d }))}
                  value={
                    durations
                      .map(d => ({ value: d, label: d }))
                      .find(opt => opt.value === duration) || null
                  }
                  onChange={opt => setDuration(opt?.value || '')}
                  placeholder="Selecione a duração"
                  classNames={customSelectStyles.classNames}
                />
              </div>
            </div>
          </div>
        )}
  
        {/* Botões */}
        <div className="flex justify-end gap-4 mt-auto mb-20">
          <button
            onClick={() => router.back()}
            className="text-gray-600 font-medium hover:underline"
          >
            Cancelar
          </button>
          <div onClick={handleSubmit}>
            <Button>Confirmar Agendamento</Button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
