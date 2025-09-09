"use client";

import { RoomCard } from "@/components/index";
import { RoomCards } from "@/components/RoomCardAdmin";
import { FaSearch, FaFilter } from "react-icons/fa";
import { mockRooms } from "./mock";
import { ChangeEvent, useState } from "react";

export default function SalasPage() {
  const [search, setSearch] = useState("");
  const userRole = "admin"; //Admin ou "User"

  const filteredSalas = mockRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <main className="max-w-[1200px] mx-auto p-8">
      
      <header className="mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {userRole === "admin" ? "Painel do Administrador" : "Salas"}
          </h1>
          <p className="text-gray-500 text-lg">
            {userRole === "admin" ? "Crie, edite e gerencie salas" : "Faça a reserva da sua sala"}
          </p>
        </div>
      </header>

      <div className="flex gap-4 mb-4">
        <div className="relative flex items-center flex-grow">
          <FaSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Encontre e reserve salas ou laboratórios"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900 placeholder-gray-500"
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative flex items-center">
          <FaFilter className="absolute left-4 text-gray-500" />
          <select className="min-w-[150px] pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900">
            <option>Filtros</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <button className="px-4 py-2 rounded-full bg-green-300 font-medium text-green-900">
          {mockRooms.filter((room) => room.status === "Disponível").length}{" "}
          Disponível
        </button>
        <button className="px-4 py-2 rounded-full bg-yellow-300 font-medium text-yellow-900">
          {mockRooms.filter((room) => room.status === "Ocupado").length}{" "}
          Ocupadas
        </button>
        <button className="px-4 py-2 rounded-full bg-red-300  font-medium text-gray-900">
          {mockRooms.filter((room) => room.status === "Manutenção").length}{" "}
          Manutenção
        </button>
      </div>

      <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
  {filteredSalas.map((sala) =>
    userRole === "admin" ? (
      <RoomCards key={sala.id} sala={sala} userRole="Admin" />
    ) : (
      <RoomCard key={sala.id} sala={sala} />
    )
  )}
</div>
    </main>
  );
}

