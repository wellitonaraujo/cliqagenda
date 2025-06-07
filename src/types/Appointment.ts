export interface Collaborator {
  id: number;
  nome: string;
}
export interface Appointment {
  id: number;
  cliente: { nome: string };
  colaborador: Collaborator;
  servico: { nome: string };
  data: string;
  hora: string;
  duracaoMin: number;
  preco: number;
  status: string;
}
