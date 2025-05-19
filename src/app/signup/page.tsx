"use client";

import Input from "@/componentes/Input";
import Button from "@/componentes/Button";
import Link from "next/link";
import ErrorMessage from "@/componentes/ErrorMessage";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmTouched, setIsConfirmTouched] = useState(false);

  const {
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  } = usePasswordValidation();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    // Valida as senhas
    const isValid = validatePasswords(password, confirmPassword);
    if (!name || !email || !password || !confirmPassword || !isValid) return;

    console.log("Cadastro enviado");
  };

  const passwordIsValid = isPasswordValid(password);

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    passwordIsValid &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

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
            <Input
              label=""
              type="text"
              placeholder="Nome completo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              hasError={isSubmitted && !name}
            />
            <p className="text-start text-xs mt-2 text-gray-500">Nome e sobrenome</p>
          </div>

          <div className="mb-4">
            <Input
              label=""
              type="email"
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              hasError={isSubmitted && !email}
            />
            <p className="text-start text-xs mt-2 text-gray-500">
              Iremos enviar um email de confirmação
            </p>
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
              hasError={isSubmitted && !password}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                setIsConfirmTouched(true);
              }}
              hasError={isSubmitted && !confirmPassword}
            />
            {isConfirmTouched && confirmPassword && password !== confirmPassword && (
              <ErrorMessage message="As senhas não são iguais." />
            )}
          </div>

          <div className="pt-14">
            <Button type="submit" full disabled={!isFormValid}>
              Criar Conta
            </Button>
          </div>
        </form>

        <p className="text-center text-md text-gray-500">
          Já tem uma conta? <Link href="/login" className="text-[#00AEEF] font-bold">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
