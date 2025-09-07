"use client";

import { RoomCards } from "@/components/RoomCards";
import { FaSearch, FaFilter } from "react-icons/fa";
import { mockRooms } from "@/app/(dashboard)/salas/mock";
import { ChangeEvent, useState } from "react";

export default function SalasPage() {
  const [search, setSearch] = useState("");

  const filteredSalas = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <main className="max-w-[1200px] mx-auto p-8">
      {/* Título */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Painel Do Administrador</h1>
        <p className="text-gray-500 text-lg">Crie, edite e gerencie salas</p>
      </header>

      {/* Caixa de pesquisa + Filtro */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex items-center flex-grow">
          <FaSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Encontre salas ou laboratórios"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-gray-900 placeholder-gray-500 shadow-sm"
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative flex items-center w-[200px]">
          <FaFilter className="absolute left-4 text-gray-500" />
          <select className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-gray-900 shadow-sm">
            <option>Filtros</option>
            <option value="Disponível">Disponível</option>
            <option value="Ocupado">Ocupadas</option>
            <option value="Manutenção">Manutenção</option>
          </select>
        </div>
      </div>

      {/* Status */}
      <div className="flex gap-4 mb-8">
        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
          {mockRooms.filter((room) => room.status === "Disponível").length} Disponível
        </span>
        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
          {mockRooms.filter((room) => room.status === "Ocupado").length} Ocupadas
        </span>
        <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
          {mockRooms.filter((room) => room.status === "Manutenção").length} Manutenção
        </span>
      </div>

      {/* Grid de salas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalas.map((sala) => (
          <RoomCards key={sala.id} sala={sala} />
        ))}
      </div>
    </main>
  );
}
