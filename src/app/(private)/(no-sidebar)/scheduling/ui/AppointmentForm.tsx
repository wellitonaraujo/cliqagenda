'use client';

import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import { useAppointmentForm } from '../hooks/useAppointmentForm';
import { SelectField } from '@/componentes/SelectField';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';

export default function AppointmentForm() {
  const {
    form,
    clientes,
    colaboradores,
    servicos,
    durationOptions,
    hourOptions,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectHoraChange,
    handleSubmit,
    isSubmitting
  } = useAppointmentForm();

  const router = useRouter();

  return (
    <>
      <HeaderWithBackButton title="Novo agendamento" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField
          label="Cliente*"
          options={clientes} 
          value={form.cliente} 
          onChange={handleSelectChange('cliente')} 
          placeholder="Selecione um cliente"
          noOptionsMessage={() => 'Nenhum cliente encontrado'}
        />
        <SelectField 
          label="Serviço*" 
          options={servicos} 
          value={form.servico} 
          onChange={handleSelectChange('servico')} 
          placeholder="Selecione um serviço" 
          noOptionsMessage={() => 'Nenhum serviço encontrado'}
        />
        <div className="flex gap-4">
          <div className="w-1/2">
            <Input label="Data*" type="date" name="data" value={form.data} onChange={handleInputChange} />
          </div>

          <div className="w-1/2">
            <SelectField
              label="Hora*"
              options={hourOptions}
              value={hourOptions.find((opt) => opt.value === form.hora) || null}
              onChange={(opt) => handleSelectHoraChange(opt?.value?.toString() || '')}
              placeholder="Selecione um horário"
              isDisabled={!form.data || hourOptions.length === 0}
              noOptionsMessage={() => 'Nenhum horário disponível'}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <SelectField 
              label="Duração" 
              options={durationOptions} 
              value={form.duracaoMin} 
              onChange={(opt) => handleSelectChange('duracaoMin')(opt)} 
              placeholder="Duração"
              noOptionsMessage={() => 'Nenhuma duração disponível'}
            />
          </div>

          <div className="w-1/2">
            <Input
              label="Preço"
              name="preco"
              value={form.preco}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
        <SelectField 
          label="Colaborador*"
          options={colaboradores} 
          value={form.colaborador} 
          onChange={handleSelectChange('colaborador')} 
          placeholder="Selecione um colaborador" 
          noOptionsMessage={() => 'Nenhum colaborador encontrado'}
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-700 text-sm font-medium hover:underline"
            >
            Cancelar
            </button>

            <Button 
              type="submit"
              disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Agendar'}
            </Button>
        </div>
      </form>
    </>
  );
}