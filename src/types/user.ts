export interface User {
  id: number;
  nome: string;
  role: string;
  email: string;
  empresaId: number;
  empresaNome: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
  };
}

export interface Empresa {
  id: number;
  nome: string;
}
