import { FiTrash2 } from "react-icons/fi";

interface Appointment {
    id: number;
    customerName: string;
    date: string;
    time: string;
    status: string;
  }
  
  interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null;
    onDelete: (id: number) => void;
    onUpdate: (id: number, status: string) => void;
  }

export function StatusModal({ isOpen, onClose, appointment, onDelete, onUpdate }: StatusModalProps) {
    if (!isOpen || !appointment) return null;
  
    const handleDelete = () => {
      onDelete(appointment.id);
      onClose();
    };
  
    const handleStatusUpdate = (newStatus: string) => {
      onUpdate(appointment.id, newStatus);
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Status do Agendamento</h2>
          <p>Cliente: {appointment.customerName}</p>
          <p>Data: {appointment.date}</p>
          <p>Hora: {appointment.time}</p>
          <p>Status atual: {appointment.status}</p>
  
          <button onClick={() => handleStatusUpdate('confirmed')}>
            Confirmar
          </button>
          <button onClick={() => handleStatusUpdate('cancelled')}>
            Cancelar
          </button>
          <button onClick={handleDelete}>
            <FiTrash2 /> Excluir
          </button>
          <button onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  }
  