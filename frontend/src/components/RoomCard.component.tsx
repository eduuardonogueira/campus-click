import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
} from "react-icons/fa";
import { Amenity, IRoom } from "@/types/room";

interface IRoomCardProps {
  sala: IRoom;
}

const amenityIcons: Record<Amenity, React.ReactNode> = {
  Projetor: <FaTv />,
  Quadro: <FaChalkboardTeacher />,
  Wifi: <FaWifi />,
  "Vídeo Conferência": <FaVideo />,
};

export function RoomCard({ sala }: IRoomCardProps) {
  const statusClass = {
    Disponível: "bg-green-600 text-white",
    Ocupado: "bg-yellow-400 text-gray-900",
    Manutenção: "bg-red-600 text-white",
  }[sala.status];

  const buttonInfo = {
    Disponível: { text: "Reservar Sala", disabled: false },
    Ocupado: { text: "Reservada", disabled: true },
    Manutenção: { text: "Em manutenção", disabled: true },
  }[sala.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="relative w-full h-44">
        <Image
          src={sala.imageUrl}
          alt={`Foto da ${sala.name}`}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold ${statusClass}`}
        >
          {sala.status}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{sala.name}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <FaMapMarkerAlt className="w-4 h-4" />
          <p>{sala.location}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <FaUsers className="w-4 h-4" />
          <p>{sala.capacity} Pessoas</p>
        </div>

        <p className="text-sm text-gray-700 flex-grow mb-4">{sala.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {sala.amenities.map((amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
            >
              {amenityIcons[amenity]}
              {amenity}
            </span>
          ))}
        </div>

        <button
          className={`w-full py-3 rounded-md font-semibold text-white transition ${
            buttonInfo.disabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black hover:opacity-80 cursor-pointer"
          }`}
          disabled={buttonInfo.disabled}
        >
          {buttonInfo.text}
        </button>
      </div>
    </div>
  );
}
