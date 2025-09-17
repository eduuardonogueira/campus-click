import { MapPin, Users, Calendar, Clock } from "lucide-react";
import { Reservation } from "@/types/reservation";

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm cursor-pointer transition-transform transition-shadow duration-200 ease-in-out hover:-translate-y-[5px] hover:shadow-lg">
      <h2 className="text-xl font-semibold mt-0 mb-4">{reservation.titulo}</h2>

      {/* Linha de Meta-informações 1 */}
      <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-3">
        <span className="flex items-center gap-2">
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
