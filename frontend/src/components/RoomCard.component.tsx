"use client"
import Image from "next/image";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
} from "react-icons/fa";
import { Amenity, IRoom, RoomStatus } from "@/types/room";
import { ReserveRoomModal } from "./ReserveRoomModal.component";

interface IRoomCardProps {
  room: IRoom;
}

export function RoomCard({ room }: IRoomCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const amenityIcons: Record<Amenity, React.ReactNode> = {
    Projetor: <FaTv />,
    Quadro: <FaChalkboardTeacher />,
    Wifi: <FaWifi />,
    "Vídeo Conferência": <FaVideo />,
  };

  const statusLabels: Record<RoomStatus, string> = {
    available: "Disponível",
    scheduled: "Ocupado",
    maintenance: "Manutenção",
  };

  const statusClass: Record<RoomStatus, string> = {
    available: "bg-green-200 text-green-900 border",
    scheduled: "bg-yellow-200 text-yellow-900 border",
    maintenance: "bg-red-200 text-red-900 border",
  };

  const buttonInfo: Record<RoomStatus, { text: string; disabled: boolean }> = {
    available: { text: "Reservar sala", disabled: false },
    scheduled: { text: "Reservada", disabled: true },
    maintenance: { text: "Em manutenção", disabled: true },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="relative w-full h-44">
        <Image
          src={room.imageUrl}
          alt={`Foto da ${room.name}`}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold ${
            statusClass[room.status]
          }`}
        >
          {statusLabels[room.status]}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <FaMapMarkerAlt className="w-4 h-4" />
          <p>{room.location}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <FaUsers className="w-4 h-4" />
          <p>{room.capacity} Pessoas</p>
        </div>

        <p className="text-sm text-gray-700 flex-grow mb-4">
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.map((amenity) => (
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
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              buttonInfo[room.status].disabled
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black hover:opacity-80 cursor-pointer"
            }`}
            disabled={buttonInfo[room.status].disabled}
          >
            {buttonInfo[room.status].text}
          </button>
        </div>
        <ReserveRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
      />
      </div>
  );
}
