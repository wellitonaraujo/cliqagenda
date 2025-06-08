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
import { usePlanStore } from "../store/usePlanStore";
import { AxiosError } from "axios";

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmTouched, setIsConfirmTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    isTouched,
    isPasswordValid,
    setIsTouched,
    validatePasswords,
  } = usePasswordValidation();

  const passwordIsValid = isPasswordValid(password);

  // Validação etapa 1
  const isStep1Valid =
    nome.trim() !== "" &&
    email.trim() !== "" &&
    passwordIsValid &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;
  
  // Validação etapa 2
  const isStep2Valid =
    nomeEmpresa.trim() !== "" &&
    rua.trim() !== "" &&
    numero.trim() !== "" &&
    bairro.trim() !== "" &&
    cidade.trim() !== "";

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isStep1Valid || !validatePasswords(password, confirmPassword)) {
      return;
    }
    setStep(2);
    setIsSubmitted(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isStep2Valid) {
      return;
    }

    setLoading(true);

    const payload = {
      nome,
      email,
      senha: password,
      telefone: telefone || undefined,
      rua,
      numero,
      bairro,
      cidade,
      nomeEmpresa,
    };

    try {
      await api.post("/auth/signup", payload);
      toast.success("Conta criada com sucesso!");
      usePlanStore.getState().reset();
      router.push("/login");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(
          axiosError.response?.data?.message || "Erro ao criar conta"
        );
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
            {step === 1
              ? "Preencha seus dados para se cadastrar"
              : "Informe os dados da empresa e endereço"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleContinue}>
            <div className="mb-4">
              <Input
                placeholder="Nome completo"
                onChange={(e) => setNome(e.target.value)}
                hasError={isSubmitted && !nome}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="Telefone (opcional)"
                onChange={(e) => setTelefone(e.target.value)}
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
                A senha deve ter no mínimo 8 caracteres e conter ao menos um
                número.
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
              {isConfirmTouched &&
                confirmPassword &&
                password !== confirmPassword && (
                  <ErrorMessage message="As senhas não são iguais." />
                )}
            </div>

            <div className="pt-14">
            <Button type="submit" full disabled={!isStep1Valid || loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : (
                "Continuar"
              )}
            </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <Input
                placeholder="Nome da empresa"
                onChange={(e) => setNomeEmpresa(e.target.value)}
                hasError={isSubmitted && !nomeEmpresa}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="Rua"
                onChange={(e) => setRua(e.target.value)}
                hasError={isSubmitted && !rua}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="Número"
                onChange={(e) => setNumero(e.target.value)}
                hasError={isSubmitted && !numero}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="Bairro"
                onChange={(e) => setBairro(e.target.value)}
                hasError={isSubmitted && !bairro}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="Cidade"
                onChange={(e) => setCidade(e.target.value)}
                hasError={isSubmitted && !cidade}
              />
            </div>

            <div className="pt-14 flex flex-col gap-4">
              <Button type="submit" full disabled={!isStep2Valid || loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Criando...
                  </div>
                ) : (
                  "Criar Conta"
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                full
                onClick={() => {
                  setStep(1);
                  setIsSubmitted(false);
                }}
                disabled={loading}
              >
                Voltar
              </Button>
            </div>
          </form>
        )}

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
