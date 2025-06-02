"use client";

import Input from "@/componentes/Input";
import Button from "@/componentes/Button";
import Link from "next/link";
import ErrorMessage from "@/componentes/ErrorMessage";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/services/api";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmTouched, setIsConfirmTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  } = usePasswordValidation();

  const passwordIsValid = isPasswordValid(password);

  const isFormValid =
    nome.trim() !== "" &&
    email.trim() !== "" &&
    nomeEmpresa.trim() !== "" &&
    passwordIsValid &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid || !validatePasswords(password, confirmPassword)) {
      return;
    }

    setLoading(true);

    const payload = {
      nome,
      email,
      senha: password,
      telefone: telefone || undefined,
      rua: rua || undefined,
      numero: numero || undefined,
      bairro: bairro || undefined,
      cidade: cidade || undefined,
      nomeEmpresa,
    };

    try {
      await api.post("/auth/signup", payload);
      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data?.message || "Erro ao criar conta");
      } else {
        toast.error("Erro ao conectar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-6 bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            <span className="text-primary">Criar conta</span>
          </h1>
          <p className="text-gray-500 text-center">
            Preencha seus dados para se cadastrar
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Input
              placeholder="Nome completo"
              onChange={(e) => setNome(e.target.value)}
              hasError={isSubmitted && !nome}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Nome da empresa"
              onChange={(e) => setNomeEmpresa(e.target.value)}
              hasError={isSubmitted && !nomeEmpresa}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Telefone (opcional)"
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          {/* Campos do endereço desmembrados */}
          <div className="mb-4">
            <Input placeholder="Rua" onChange={(e) => setRua(e.target.value)} />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Número"
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Bairro"
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Cidade"
              onChange={(e) => setCidade(e.target.value)}
            />
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
            <Button type="submit" full disabled={!isFormValid || loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando...
                </div>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </div>
        </form>

        <p className="text-center text-md text-gray-500">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#00AEEF] font-bold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
