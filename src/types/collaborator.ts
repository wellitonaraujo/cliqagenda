export type Horario = {
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  ativo: boolean;
};

export type CollaboratorInput = {
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  horarios: Horario[];
  role?: "COLLABORATOR"
};

export type Collaborator = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  role: string;
  empresaId: number;
};
