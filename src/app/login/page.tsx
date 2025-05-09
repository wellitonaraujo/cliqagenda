'use client';

import Button from "@/componentes/Button";
import Checkbox from "@/componentes/Checkbox";
import ErrorMessage from "@/componentes/ErrorMessage";
import Input from "@/componentes/Input";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!email || !password) return;

    console.log("Formulário enviado");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            <span className="text-primary">agendei99</span>
          </h1>
          <p className="text-gray-500 text-center">Entre com seu email e senha</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-8">
            <Input
              label=""
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              hasError={isSubmitted && !email}
            />
          </div>

          <div className="mb-12 relative">
            <Input
              label=""
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              hasError={isSubmitted && !password}
            />
            {isSubmitted && (!email || !password) && (
              <ErrorMessage message="Email e senha obrigatórios" />
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <Checkbox label="Lembrar senha" />
            <Link href="#" className="text-primary">Esqueci a senha</Link>
          </div>

          <div className="pt-10">
            <Button type="submit" full>
              Entrar
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não possui uma conta?{" "}
          <Link href="/home" className="text-primary">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
