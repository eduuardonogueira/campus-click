import { MapPin, Users, Calendar, Clock } from "lucide-react";
import { Reservation } from "@/types/reservation";
import { BiTrash } from "react-icons/bi";

interface ReservationCardProps {
  reservation: Reservation;
  onDelete: (id: number) => void;
}

export function ReservationCard({
  reservation,
  onDelete,
}: ReservationCardProps) {
  return (
    <div className="border border-gray-400 rounded-md p-6">
      <div className="flex justify-between items-center">
        {/* Adicionar as informaçöes da sala no componente inteiro */}
        <h2 className="font-bold text-2xl">{reservation.titulo}</h2>
        <button
          onClick={() => onDelete(reservation.id)}
          className="flex items-center border border-gray-800 rounded-lg px-3 py-2 cursor-pointer text-sm text-gray-800 hover:bg-red-400"
        >
          <BiTrash className="mr-1 w-4 h-4 text-gray-800" />
          Cancelar
        </button>
      </div>

      <div className="flex items-center gap-4 text-gray-600 text-sm mb-5">
        <span className="flex items-center gap-2">
          <MapPin size={16} />
          {reservation.local}
        </span>
        <span className="flex items-center gap-2">
          <Users size={16} />
          {reservation.capacidade} Pessoas
        </span>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-800 mb-3">
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
        <strong>Detalhes:</strong> {reservation.proposito}
      </p>
    </div>
  );
}

