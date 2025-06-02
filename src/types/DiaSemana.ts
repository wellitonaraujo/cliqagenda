export type DiaSemana =  'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO' | 'DOMINGO';

export interface Horario {
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFim: string;
  ativo: boolean;
}
