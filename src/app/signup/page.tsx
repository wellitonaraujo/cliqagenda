'use client';

import { useState } from "react";
import Input from "@/componentes/Input";
import Button from "@/componentes/Button";
import Link from "next/link";
import ErrorMessage from "@/componentes/ErrorMessage";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    error,
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  } = usePasswordValidation();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validatePasswords(password, confirmPassword);
    if (!isValid) return;

    console.log("Cadastro enviado");
  };

  const passwordIsValid = isPasswordValid(password);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            <span className="text-primary">Criar conta</span>
          </h1>
          <p className="text-gray-500 text-center">Preencha seus dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Input label="" type="text" placeholder="Nome completo" />
            <p className="text-start text-xs mt-2 text-gray-500">Nome e sobrenome</p>
          </div>

          <div className="mb-4">
            <Input label="" type="email" placeholder="Email" />
            <p className="text-start text-xs mt-2 text-gray-500">Iremos enviar um email de confirmação</p>
          </div>

          <div className="mb-4">
            <Input
              label=""
              type="password"
              placeholder="Senha"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setIsTouched(true);
              }}
            />
            <p
              className={`text-xs mt-2 ${
                !password
                  ? "text-gray-500"
                  : passwordIsValid
                  ? "text-green-600"
                  : isTouched
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              A senha deve ter no mínimo 8 caracteres e conter ao menos um número.
            </p>
          </div>

          <div className="mb-4">
            <Input
              label=""
              type="password"
              placeholder="Confirmar senha"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

            {error && <ErrorMessage message={error} />}

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
