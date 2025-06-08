'use client';

import Button from "@/componentes/Button";
import ErrorMessage from "@/componentes/ErrorMessage";
import Input from "@/componentes/Input";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!email || !senha) return;

    setLoading(true);
    try {
      await login(email, senha);
      router.push('/home');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const message =
          axiosError.response?.data?.message || 'Email ou senha inválidos';
        toast.error(message);
      } else {
        toast.error('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#034D82] p-4">
      <div className="w-full max-w-[95vw] md:max-w-sm space-y-9 bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div>
            <h1 className="text-3xl font-bold text-center mb-3">
              <span className="text-[#034D82]">Cliq</span>
              <span className="text-[#1195FF]">Agenda</span>
            </h1>
          <p className="text-gray-500 text-center">Entre com seu email e senha</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-10">
            <Input
              label=""
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              hasError={isSubmitted && !email}
            />
            {isSubmitted && (!email || !senha) && (
              <ErrorMessage message="Email e senha obrigatórios" />
            )}
          </div>

          <div className="relative">
            <Input
              label=""
              type="password"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
              hasError={isSubmitted && !senha}
            />
          </div>

          <div className="flex items-center justify-between text-sm font-medium">
            <Link href="#" className="text-[#034D82]">Esqueci a senha</Link>
          </div>

          <div className="pt-5">
            <Button type="submit" full disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>

        <p className="text-center text-md text-gray-500">
          Não possui uma conta?{" "}
          <Link href="/signup" className="text-[#034D82] font-bold">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
