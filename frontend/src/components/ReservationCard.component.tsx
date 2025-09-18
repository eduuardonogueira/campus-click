import { MapPin, Users, Calendar, Clock } from 'lucide-react';
import { Reservation } from '@/types/reservation';
import styles from './ReservationCard.module.css';
import { BiTrash } from 'react-icons/bi';

interface ReservationCardProps {
  reservation: Reservation;
  onDelete: (id: number) => void;
}

export function ReservationCard({ reservation, onDelete }: ReservationCardProps) {
  return (
    <div className={styles.card}>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className={styles.title}>{reservation.titulo}</h2>
        <button
          onClick={() => onDelete(reservation.id)}
          className="flex items-center border border-gray-600 rounded-lg px-3 py-2 cursor-pointer text-sm text-gray-600 hover:bg-gray-200"
        >
          <BiTrash className="mr-1 w-4 h-4 text-gray-500" />
          Cancelar
        </button>
      </div>

      {/* Local e Capacidade */}
      <div className={styles.metaInfoRow}>
        <span className={styles.infoItem}>
          <MapPin size={16} />
          {reservation.local}
        </span>
        <span className="flex items-center gap-2">
          <Users size={16} />
          {reservation.capacidade} Pessoas
        </span>
      </div>

      {/* Linha de Meta-informações 2 */}
      <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-3">
        <span className="flex items-center gap-2">
          <Calendar size={16} />
          {reservation.data}
        </span>
        <span className="flex items-center gap-2">
          <Clock size={16} />
          {reservation.horario}
        </span>
      </div>

      <p className="text-sm text-gray-700 mt-4">
        <strong>Propósito:</strong> {reservation.proposito}
      </p>
    </div>
  );
}

