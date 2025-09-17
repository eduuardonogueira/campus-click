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
  FaChevronDown,
} from "react-icons/fa";
import { BiAlarm, BiEdit, BiTrash } from "react-icons/bi";
import { Amenity, IRoom } from "@/types/room";

import { EditRoomModal } from "@/components/EditRoomModal.component";
import { DeleteRoomModal } from "@/components/DeleteRoomModal.component";

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

  const statusClassMap: Record<string, string> = {
    Disponível: "bg-green-200 text-green-900 border",
    Ocupado: "bg-yellow-200 text-yellow-900 border",
    Manutenção: "bg-red-200 text-red-900 border",
    available: "bg-green-200 text-green-900 border",
    scheduled: "bg-yellow-200 text-yellow-900 border",
    maintenance: "bg-red-200 text-red-900 border",
  };

  const statusClass = statusClassMap[sala.status] ?? "bg-gray-200 text-gray-600";

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
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold ${statusClass}`}
        >
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
            {/* Select customizado */}
            <div className="relative">
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              <select className="w-[170px] h-10 border border-gray-600 rounded-md text-sm text-gray-500 appearance-none pr-10 pl-3">
                <option>Reservada</option>
                <option>Disponível</option>
                <option>Manutenção</option>
              </select>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3">
              <button className="p-2 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-gray-200">
                <BiAlarm className="text-gray-500 w-5 h-5" />
              </button>
              <button
                onClick={() => setEditOpen(true)}
                className="p-2 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-gray-200"
              >
                <BiEdit className="text-gray-500 w-5 h-5" />
              </button>
              <button
                onClick={() => setDeleteOpen(true)}
                className="p-2 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-gray-200"
              >
                <BiTrash className="text-gray-500 w-5 h-5" />
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
