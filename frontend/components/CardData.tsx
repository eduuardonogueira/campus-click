"use client"

import React, { useState } from "react";

const cardData = [
  {
    name: "Laboratório A",
    availability: "Disponível",
    capacity: 20,
    summary: "Laboratório de informática equipado com computadores modernos.",
    tags: ["Projetor", "Ar-condicionado"]
  },
  {
    name: "Sala B",
    availability: "Ocupada",
    capacity: 15,
    summary: "Sala de aula tradicional com mesas e cadeiras.",
    tags: ["Ar-condicionado"]
  },
  {
    name: "Laboratório C",
    availability: "Disponível",
    capacity: 25,
    summary: "Laboratório com equipamentos para aulas práticas de ciência.",
    tags: ["Projetor"]
  },
  {
    name: "Sala D",
    availability: "Disponível",
    capacity: 30,
    summary: "Sala ampla para reuniões e workshops.",
    tags: ["Projetor", "Ar-condicionado"]
  },
  {
    name: "Laboratório E",
    availability: "Ocupada",
    capacity: 10,
    summary: "Pequeno laboratório para aulas de programação.",
    tags: ["Ar-condicionado"]
  },
  {
    name: "Sala F",
    availability: "Disponível",
    capacity: 20,
    summary: "Sala moderna com iluminação natural e cadeiras confortáveis.",
    tags: ["Projetor"]
  }
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filtra os cards conforme pesquisa e filtro
  const filteredCards = cardData.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "labs" && card.name.toLowerCase().includes("laboratório")) ||
      (filter === "today" && card.availability === "Disponível") ||
      (filter === "tomorrow"); // aqui você pode adicionar lógica de disponibilidade futura
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white p-2">
      {/* Caixa de pesquisa */}
      <div className="justify-between flex mb-12">
        <input
          type="text"
          placeholder="Encontre ou reserve sala e laboratórios"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-[950px] p-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 border-2 border-black-700"
        />

      {/* Barra de filtros */}
      
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-[400px] p-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ml-3 border-2 border-black-700"
        >
          <option value="all">Todas as Salas</option>
          <option value="labs">Laboratórios</option>
          <option value="today">Disponíveis Hoje</option>
          <option value="tomorrow">Disponíveis Amanhã</option>
        </select>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
            <p className="mb-1">{card.availability}</p>
            <p className="mb-1"><strong>Capacidade:</strong> {card.capacity} pessoas</p>
            <p className="mb-3 text-gray-700">{card.summary}</p>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filteredCards.length === 0 && (
          <p className="col-span-full text-center text-gray-500">Nenhuma sala encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
