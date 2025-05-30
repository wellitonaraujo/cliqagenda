'use client';

import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import { useNewServiceForm } from './hooks/useNewServiceForm';
import { SelectField } from '@/componentes/SelectField';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';
import Select from 'react-select';
import React from 'react';

export default function NewService() {
  const {
    nome, setNome,
    descricao, setDescricao,
    preco, handlePriceChange,
    durationOptions, duracaoMin,
    collaboratorOptions, colaboradoresIds,
    handleDurationChange,
    handleCollaboratorChange,
    handleSubmit,
    router,
    isSubmitting
  } = useNewServiceForm();

  return (
   <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl bg-white p-6 rounded border border-gray-100 shadow-xs">
       <HeaderWithBackButton title="Novo serviço" />
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome*"
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div>
            <label className="block text-gray-700 text-sm mb-1">Descrição</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do serviço"
            />
          </div>

          <div className="flex flex-row gap-4 w-full">
           <div className="flex-1">
              <SelectField
                label="Duração*"
                options={durationOptions}
                value={durationOptions.find(opt => opt.value === duracaoMin) || null}
                onChange={handleDurationChange}
                placeholder="Selecione a duração"
                noOptionsMessage={() => 'Nenhuma duração encontrada'}
              />
            </div>

            <div className="flex-1">
              <Input
                label="Preço*"
                type="text"
                value={preco}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Colaboradores*</label>
            <Select
              classNamePrefix="custom-select"
              options={collaboratorOptions}
              value={collaboratorOptions.filter(opt => colaboradoresIds.includes(opt.value as number))}
              onChange={handleCollaboratorChange}
              placeholder="Selecione os colaboradores"
              noOptionsMessage={() => 'Nenhum colaborador encontrado'}
              isMulti
              closeMenuOnSelect={false}
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: 50,
                  borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
                  boxShadow: state.isFocused ? '0 0 0 1px #00AEEF' : base.boxShadow,
                  '&:hover': {
                    borderColor: state.isFocused ? '#00AEEF' : base.borderColor,
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  paddingTop: 4,
                  paddingBottom: 4,
                }),
              }}
            />

            <p className="text-sm text-gray-500 mt-1">Profissionais que realizam esse serviço</p>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-700 text-sm font-medium hover:underline"
            >
              Cancelar
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Criar Serviço'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
