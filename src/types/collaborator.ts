export type TimeRange = {
  start: string;
  end: string;
};

export type DaySchedule = {
  open: boolean;
  ranges: TimeRange[];
};

export type Schedule = {
  [day: string]: DaySchedule;
};

export type Collaborator = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  createdAt: string;
  role: string;
};
