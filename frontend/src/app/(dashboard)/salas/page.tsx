"use client";

import { RoomCard } from "@/components/index";
import { RoomCards } from "@/components/RoomCardAdmin";
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa";
import { mockRooms } from "./mock";
import { ChangeEvent, useState } from "react";
import { EmptyState } from "@/components/EmptyState/EmptyState.salas.component";
import { CreateRoomModal } from "@/components/CreateRoomModal";

export default function SalasPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = "admin"; // "admin" ou "user"

  const filteredSalas = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <main className="max-w-[1200px] mx-auto p-8">
      {/* Header */}
      <header className="mb-4">
        <div>
          <h1 className="text-4xl font-bold">
            {userRole === "admin" ? "Painel do Administrador" : "Salas"}
          </h1>
          <p className="text-gray-500 text-lg p-1">
            {userRole === "admin"
              ? "Crie, edite e gerencie salas"
              : "Faça a reserva da sua sala"}
          </p>
        </div>
      </header>

      {/* Barra de pesquisa e filtros */}
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
          <select className="min-w-[220px] pl-10 pr-4 h-10 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900 appearance-none pr-10 pl-3">
            <option>Filtros</option>
          </select>
          {/* Ícone da seta */}
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Botão só para Admin */}
        {userRole === "admin" && (
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

      {filteredSalas.length === 0 ? (
        <EmptyState
          title="Não há salas cadastradas no sistema"
          message="O administrador não adicionou salas para agendamento"
        />
      ) : (
        <>
          {/* Contadores */}
          <div className="flex gap-2 mb-8">
            <button className="px-4 py-2 border border-green rounded-full bg-green-200 font-black text-green-900">
              {mockRooms.filter((room) => room.status === "Disponível").length}{" "}
              Disponível
            </button>
            <button className="px-4 py-2 border border-yellow rounded-full bg-yellow-200 font-black text-yellow-900">
              {mockRooms.filter((room) => room.status === "Ocupado").length}{" "}
              Ocupadas
            </button>
            <button className="px-4 py-2 border border-red rounded-full bg-red-200 font-black text-red-900">
              {mockRooms.filter((room) => room.status === "Manutenção").length}{" "}
              Manutenção
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {filteredSalas.map((sala) =>
              userRole === "admin" ? (
                <RoomCards key={sala.id} sala={sala} userRole="Admin" />
              ) : (
                <RoomCard key={sala.id} sala={sala} />
              )
            )}
          </div>
        </>
      )}

      {/* Modal de Criação */}
      <CreateRoomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
