import { MapPin, Users } from "lucide-react";
import { BiTrash } from "react-icons/bi";
import { Reservation } from "@/types/reservation";
import styles from "./ReservationCard.module.css";

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
        <span className={styles.infoItem}>
          <Users size={16} />
          {reservation.capacidade} Pessoas
        </span>
      </div>

      {/* Data e Horário */}
      <div className={styles.metaInfoRow}>
        <span className={styles.infoItem}>{reservation.data}</span>
        <span className={styles.infoItem}>{reservation.horario}</span>
      </div>

      {/* Propósito */}
      <p className={styles.purpose}>
        <strong>Propósito:</strong> {reservation.proposito}
      </p>
    </div>
  );
}
