import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
  FaEdit,
  FaTrash,
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

export function RoomCards({ sala }: IRoomCardProps) {
    const statusClass = {
    Disponível: "bg-green-300 text-white",
    Ocupado: "bg-yellow-300 text-gray-900",
    Manutenção: "bg-red-300 text-white",
  }[sala.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden">
      {/* Imagem */}
      <div className="relative w-full h-48">
        <Image
          src={sala.imageUrl}
          alt={`Foto da ${sala.name}`}
          fill
          className="object-cover"
        />
        {/* Status sobreposto */}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold ${statusClass}`}>
          {sala.status}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{sala.name}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <FaMapMarkerAlt className="inline w-4 h-4 mr-1" /> 
            <p>{sala.location}</p> 
      
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <FaUsers className="inline w-4 h-4 mr-1" /> 
            <p>{sala.capacity} Pessoas</p> 
        </div>
        
        <p className="text-sm text-gray-700 flex-grow mb-4">{sala.description}</p>

        {/* Tags / Amenidades */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sala.amenities?.map((amenity: Amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
            >
              {amenityIcons[amenity]}
              {amenity}
            </span>
          ))}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between">
          {/* Select de status */}
          <select className="px-14 py-3 border rounded-md text-sm">
            <option>Reservada</option>
            <option>Ocupado</option>
            <option>Manutenção</option>
          </select>

          {/* Botões */}
          <div className="flex gap-3">
            <button className="p-3 border rounded-md bg-gray-100 hover:bg-gray-200">
              <FaEdit className="text-gray-600" />
            </button>
            <button className="p-3 border rounded-md bg-gray-100 hover:bg-gray-200">
              <FaTrash className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
