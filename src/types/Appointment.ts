export interface Appointment {
    id: string | number;
    cliente: {
      nome: string;
    };
    duracaoMin: string;
    time: string;
    servico: {
      nome: string;
    };
    preco: string | number;
    status?: string;
  }
  
  export interface TimeSlot {
    id: number
    label: string;
  }
  