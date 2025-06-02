'use client';

import { useCustomers } from '@/context/CustomersContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useNewCustomer() {
  const router = useRouter();
  const { createCustomer } = useCustomers();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await createCustomer(form);
    router.push('/customers');
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    form,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
