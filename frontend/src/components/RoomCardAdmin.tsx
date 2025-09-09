"use client";

import Image from "next/image";
import { useState } from "react";
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
import { EditRoomModal, DeleteRoomModal } from "@/components/Modal.component";

interface IRoomCardProps {
  sala: IRoom;
  userRole: string;
}

const amenityIcons: Record<Amenity, React.ReactNode> = {
  Projetor: <FaTv />,
  Quadro: <FaChalkboardTeacher />,
  Wifi: <FaWifi />,
  "Vídeo Conferência": <FaVideo />,
};

export function RoomCards({ sala, userRole }: IRoomCardProps) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

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
        {userRole === "Admin" && (
          <div className="flex items-center justify-between gap-3">
            <select className="px-14 py-3 border rounded-md text-sm">
              <option>Reservada</option>
              <option>Disponível</option>
              <option>Manutenção</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => setEditOpen(true)}
                className="p-3 border rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <FaEdit className="text-gray-600" />
              </button>
              <button
                onClick={() => setDeleteOpen(true)}
                className="p-3 border rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modais */}
      <EditRoomModal sala={sala} isOpen={isEditOpen} onClose={() => setEditOpen(false)} />
      <DeleteRoomModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          console.log("Sala excluída:", sala.id);
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}
