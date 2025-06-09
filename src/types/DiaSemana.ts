export enum DiaSemana {
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export interface Horario {
  diaSemana: DiaSemana;
  aberto: boolean;
  horaAbertura?: string;
  horaFechamento?: string;
}