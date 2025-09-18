"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { EnumRoomStatus, IRoomWithAmenities, RoomStatus } from "@/types/room";
import { DeleteRoomModal, CreateEditRoomModal } from "@/components/index";
import { BiAlarm, BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { deleteRoom } from "@/api/room";
import Link from "next/link";
import { AVAILABILITY_ROUTE } from "@/constants/routes";

interface IRoomCardProps {
  room: IRoomWithAmenities;
}

export function AdminRoomCard({ room }: IRoomCardProps) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [status, setStatus] = useState<RoomStatus>(room.status);

  const statusClass: Record<RoomStatus, string> = {
    available: "bg-green-200 text-green-900 border",
    scheduled: "bg-yellow-200 text-yellow-900 border",
    maintenance: "bg-red-200 text-red-900 border",
  };

  const statusLabels: Record<RoomStatus, string> = {
    available: "Disponível",
    scheduled: "Ocupado",
    maintenance: "Manutenção",
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as RoomStatus;
    setStatus(newStatus);
    console.log("Novo status selecionado:", newStatus);
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom(room.id);
      toast.success("Sala excluída com sucesso!");
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir a sala.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={room.imageUrl || "/placeholder.jpg"}
          alt={`Foto da ${room.name}`}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-bold ${
            statusClass[status]
          }`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <FaMapMarkerAlt className="inline w-4 h-4 mr-1" />
          <p>{room.location}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <FaUsers className="inline w-4 h-4 mr-1" />
          <p>{room.capacity} Pessoas</p>
        </div>

        <p className="text-sm text-gray-700 flex-grow mb-4">{room.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities?.map((amenity) => (
            <span
              key={amenity.id}
              className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
            >
              {amenity.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="w-full box-border">
            <select
              className="w-full h-10 border border-gray-600 rounded-md text-sm text-gray-500 px-4"
              value={status}
              onChange={handleStatusChange}
            >
              <option value={EnumRoomStatus.OCCUPIED}>Reservada</option>
              <option value={EnumRoomStatus.AVAILABLE}>Disponível</option>
              <option value={EnumRoomStatus.MAINTENANCE}>Manutenção</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Link
              href={`${AVAILABILITY_ROUTE}/${room.id}`}
              className="p-2 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-yellow-400"
            >
              <BiAlarm className="text-gray-500 w-5 h-5" />
            </Link>
            <button
              onClick={() => setEditOpen(true)}
              className="p-3 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-blue-400"
            >
              <BiEdit className="text-gray-500" />
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="p-3 border border-gray-600 rounded-md bg-white cursor-pointer hover:bg-red-400"
            >
              <BiTrash className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <CreateEditRoomModal
        roomData={room}
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        action="update"
      />
      <DeleteRoomModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteRoom}
      />
    </div>
  );
}
