import { MapPin, Users, Calendar, Clock } from 'lucide-react';
import { Reservation } from '@/types/reservation';
import styles from './ReservationCard.module.css';

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{reservation.titulo}</h2>
      
      <div className={styles.metaInfoRow}>
        <span className={styles.infoItem}>
          <MapPin size={16} />
          {reservation.local}
        </span>
        <span className={styles.infoItem}>
          <Users size={16} />
          {reservation.capacidade} Pessoas
        </span>
      </div>

      {/* Linha de Meta-informações 2 */}
      <div className={styles.metaInfoRow}>
         <span className={styles.infoItem}>
            {reservation.data}
        </span>
         <span className={styles.infoItem}>
            {reservation.horario}
        </span>
      </div>

      <p className={styles.purpose}>
        <strong>Propósito:</strong> {reservation.proposito}
      </p>
    </div>
  );
}