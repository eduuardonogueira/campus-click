<<<<<<< HEAD
import { MapPin, Users } from "lucide-react";
import { BiTrash } from "react-icons/bi";
import { Reservation } from "@/types/reservation";
import styles from "./ReservationCard.module.css";
=======
import { MapPin, Users, Calendar, Clock } from "lucide-react";
import { Reservation } from "@/types/reservation";
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d

interface ReservationCardProps {
  reservation: Reservation;
  onDelete: (id: number) => void;
}

export function ReservationCard({ reservation, onDelete }: ReservationCardProps) {
  return (
<<<<<<< HEAD
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
=======
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm cursor-pointer transition-transform transition-shadow duration-200 ease-in-out hover:-translate-y-[5px] hover:shadow-lg">
      <h2 className="text-xl font-semibold mt-0 mb-4">{reservation.titulo}</h2>

      {/* Linha de Meta-informações 1 */}
      <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-3">
        <span className="flex items-center gap-2">
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d
          <MapPin size={16} />
          {reservation.local}
        </span>
        <span className="flex items-center gap-2">
          <Users size={16} />
          {reservation.capacidade} Pessoas
        </span>
      </div>

<<<<<<< HEAD
      {/* Data e Horário */}
      <div className={styles.metaInfoRow}>
        <span className={styles.infoItem}>{reservation.data}</span>
        <span className={styles.infoItem}>{reservation.horario}</span>
      </div>

      {/* Propósito */}
      <p className={styles.purpose}>
=======
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
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d
        <strong>Propósito:</strong> {reservation.proposito}
      </p>
    </div>
  );
}
