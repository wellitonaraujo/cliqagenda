export type DiaSemana =  'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO' | 'DOMINGO';

export interface Horario {
  diaSemana: DiaSemana;
  horaAbertura: string;
  horaFechamento: string;
  aberto: boolean;
}
