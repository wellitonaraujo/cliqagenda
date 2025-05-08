'use client';

import Button from "@/componentes/Button";
import Checkbox from "@/componentes/Checkbox";
import Illustration from "@/componentes/Illustration";
import Input from "@/componentes/Input";
import PasswordInput from "@/componentes/PasswordInput";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Formulário enviado");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center"><span className="text-primary">agendei99</span></h1>
          <p className="text-gray-500 text-center">Entre com seu email e senha</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="" type="email" placeholder="Email" />
          <Input label="" placeholder="Senha" type="password" />

          <div className="flex items-center justify-between text-sm">
            <Checkbox label="Lembrar senha" />
            <Link href="#" className="text-primary">Esqueci a senha</Link>
          </div>

         <div className="pt-10">
          <Button type="submit" full >
              Entrar
          </Button>
         </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não possui uma conta? <Link href="/signup" className="text-primary">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
