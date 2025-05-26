"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";import api from "@/services/api";
import { toast } from 'react-toastify';

interface Cliente {
  id: number;
  nome: string;
}

interface Colaborador {
  id: number;
  nome: string;
}

interface Servico {
  id: number;
  nome: string;
}


export default function CreateAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    clienteId: "",
    colaboradorId: "",
    servicoId: "",
    data: "",
    hora: "",
    duracaoMin: "",
    preco: "",
  });


  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [resClientes, resColaboradores, resServicos] = await Promise.all([
          api.get("/customers"),
          api.get("/collaborators"),
          api.get("/services"),
        ]);
        setClientes(resClientes.data);
        setColaboradores(resColaboradores.data);
        setServicos(resServicos.data);
      } catch (err) {
        toast.error("Erro ao carregar dados:");
      }
    }
    fetchData();
  }, []);

  const formatDateToBackend = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.data || !form.hora) {
      setError("Data e hora são obrigatórios.");
      return;
    }

    try {
      const payload = {
        clienteId: parseInt(form.clienteId),
        colaboradorId: parseInt(form.colaboradorId),
        servicoId: parseInt(form.servicoId),
        data: formatDateToBackend(form.data),
        hora: form.hora,
        duracaoMin: form.duracaoMin ? parseInt(form.duracaoMin) : undefined,
        preco: form.preco ? parseFloat(form.preco) : undefined,
      };

      console.log("Enviando agendamento:", payload);

      await api.post("/appointments", payload);

      router.push("/home");
    } catch (err: any) {
      console.error("Erro ao criar agendamento:", err);
      setError(err.response?.data?.message || "Erro ao criar agendamento.");
    }
  };
  
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Criar Agendamento</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="clienteId" value={form.clienteId} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <select name="colaboradorId" value={form.colaboradorId} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">Selecione o colaborador</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <select name="servicoId" value={form.servicoId} onChange={handleChange} className="w-full border rounded p-2">
          <option value="">Selecione o serviço</option>
          {servicos.map((s) => (
            <option key={s.id} value={s.id}>{s.nome}</option>
          ))}
        </select>

        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />


        <input
          type="number"
          name="duracaoMin"
          placeholder="Duração (minutos)"
          value={form.duracaoMin}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço (opcional)"
          value={form.preco}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Criar Agendamento
        </button>
      </form>
    </div>
  );
}
