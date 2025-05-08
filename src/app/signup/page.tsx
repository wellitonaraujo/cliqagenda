'use client';

import { useState } from "react";
import Input from "@/componentes/Input";
import Button from "@/componentes/Button";
import Link from "next/link";
import ErrorMessage from "@/componentes/ErrorMessage";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("A senha deve ter no mínimo 8 caracteres e conter ao menos um número.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não são iguais.");
      return;
    }
    setError("");
    console.log("Cadastro enviado");
    // Continuar com a chamada de API
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            <span className="text-primary">Criar conta</span>
          </h1>
          <p className="text-gray-500 text-center">Preencha seus dados para se cadastrar</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <Input label="" type="text" placeholder="Nome completo" />
          <Input label="" type="email" placeholder="Email" />
          <Input
            label=""
            type="password"
            placeholder="Senha"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Input
            label=""
            type="password"
            placeholder="Confirmar senha"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
          <ErrorMessage message={error} />
          <div className="pt-14">
            <Button type="submit" full>
              Criar Conta
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Já tem uma conta? <Link href="/login" className="text-primary">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
