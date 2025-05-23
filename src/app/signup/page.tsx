"use client";

import Input from "@/componentes/Input";
import Button from "@/componentes/Button";
import Link from "next/link";
import ErrorMessage from "@/componentes/ErrorMessage";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmTouched, setIsConfirmTouched] = useState(false);

  const router = useRouter();

  const {
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  } = usePasswordValidation();

  const passwordIsValid = isPasswordValid(password);

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    nomeEmpresa.trim() !== "" &&
    passwordIsValid &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

    const handleSignup = async (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitted(true);
    
      const isValid = validatePasswords(password, confirmPassword);
      if (!isFormValid || !isValid) return;
    
      const payload = {
        nome: name,
        email,
        senha: password,
        telefone: telefone || undefined,
        endereco: endereco || undefined,
        nomeEmpresa,
      };
    
      try {
        await axios.post('http://localhost:3000/auth/signup', payload);
    
        alert('Conta criada com sucesso!');
        router.push('/login');
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data?.message || 'Erro ao criar conta');
        } else {
          alert('Erro ao conectar com o servidor.');
        }
      }
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

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Input placeholder="Nome completo" onChange={(e) => setName(e.target.value)} hasError={isSubmitted && !name} />
          </div>

          <div className="mb-4">
            <Input placeholder="Nome da empresa" onChange={(e) => setNomeEmpresa(e.target.value)} hasError={isSubmitted && !nomeEmpresa} />
          </div>

          <div className="mb-4">
            <Input placeholder="Telefone (opcional)" onChange={(e) => setTelefone(e.target.value)} />
          </div>

          <div className="mb-4">
            <Input placeholder="Endereço (opcional)" onChange={(e) => setEndereco(e.target.value)} />
          </div>

          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              hasError={isSubmitted && !email}
            />
          </div>

          <div className="mb-4">
            <Input
              type="password"
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
                setIsTouched(true);
              }}
              hasError={isSubmitted && !password}
            />
            <p className={`text-xs mt-2 ${
              !password ? "text-gray-500"
              : passwordIsValid ? "text-green-600"
              : isTouched ? "text-red-500"
              : "text-gray-400"
            }`}>
              A senha deve ter no mínimo 8 caracteres e conter ao menos um número.
            </p>
          </div>

          <div className="mb-4">
            <Input
              type="password"
              placeholder="Confirmar senha"
              onChange={(e) => {
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
