"use client";

import {
  RoomCard,
  AdminRoomCard,
  EmptyPage,
  CreateEditRoomModal,
} from "@/components/index";
import { toast } from "react-toastify/unstyled";
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "@/types/user";
import { EnumRoomStatus, IRoomWithAmenities } from "@/types/room";
import { getProfile, getRooms } from "@/api/index";

export default function RoomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<IUser | undefined>();
  const [rooms, setRooms] = useState<IRoomWithAmenities[] | undefined>();

  async function fetchUserProfile() {
    try {
      const response = await getProfile();

      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
    }
  }

  async function fetchRooms() {
    try {
      const response = await getRooms();

      if (response) {
        setRooms(response);
      }
    } catch (error) {
      toast.error("Erro ao buscar salas");
      console.error("Erro ao buscar perfil do usuário:", error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [isModalOpen]);

  const filteredRooms = rooms?.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <main className="max-w-[1200px] mx-auto p-8">
      <header className="mb-4">
        <div>
          <h1 className="text-4xl font-bold">
            {user?.role === "admin" ? "Painel do Administrador" : "Salas"}
          </h1>
          <p className="text-gray-500 text-lg">
            {user?.role === "admin"
              ? "Crie, edite e gerencie salas"
              : "Faça a reserva da sua sala"}
          </p>
        </div>
      </header>

      <div className="flex gap-4 mb-4">
        <div className="relative flex items-center flex-grow">
          <FaSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Encontre e reserve salas ou laboratórios"
            className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900 placeholder-gray-500"
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative flex items-center">
          <FaFilter className="absolute left-4 text-gray-500" />
          <select className="min-w-[220px] pl-10 pr-4 h-10 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900 appearance-none">
            <option>Filtros</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {user?.role === "admin" && (
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-10 bg-black text-white rounded-lg min-w-[120px] cursor-pointer hover:opacity-80"
            >
              Criar Sala
            </button>
          </div>
        )}
      </div>

      {!filteredRooms || filteredRooms.length === 0 ? (
        <EmptyPage
          title="Não há salas cadastradas no sistema"
          message="O administrador não adicionou salas para agendamento"
        />
      ) : (
        <>
          <div className="flex gap-2 mb-8">
            <button className="px-4 py-2 border border-green rounded-full bg-green-200 font-black text-green-900">
              {
                filteredRooms.filter(
                  (room) => room.status === EnumRoomStatus.AVAILABLE
                ).length
              }{" "}
              Disponível
            </button>
            <button className="px-4 py-2 border border-yellow rounded-full bg-yellow-200 font-black text-yellow-900">
              {
                filteredRooms.filter(
                  (room) => room.status === EnumRoomStatus.OCCUPIED
                ).length
              }{" "}
              Ocupadas
            </button>
            <button className="px-4 py-2 border border-red rounded-full bg-red-200 font-black text-red-900">
              {
                filteredRooms.filter(
                  (room) => room.status === EnumRoomStatus.MAINTENANCE
                ).length
              }{" "}
              Manutenção
            </button>
          </div>

          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {filteredRooms.map((room) =>
              user?.role === "admin" ? (
                <AdminRoomCard key={room.id} room={room} />
              ) : (
                <RoomCard key={room.id} room={room} />
              )
            )}
          </div>
        </>
      )}

      <CreateEditRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action="create"
      />
    </main>
  );
}

