"use client";

import {
  FaRegCalendarAlt,
  FaRegClock,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

type Room = {
  name: string;
  location: string;
};

export default function Availability() {
  const mockRooms: Room[] = [
    { name: "Sala 101", location: "Pavilhão, 2 Andar" },
    { name: "Sala 202", location: "Pavilhão, 2 Andar" },
    { name: "Laboratório A", location: "Laboratório, 1 Andar" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>(mockRooms[0]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setIsDropdownOpen(false);
  };

  const mockAvailability = [
    { day: "Segunda-feira", times: ["08:00 - 12:00", "14:00 - 22:00"] },
    { day: "Terça-feira", times: ["08:00 - 12:00"] },
    { day: "Quarta-feira", times: ["08:00 - 12:00"] },
    { day: "Quinta-feira", times: ["08:00 - 12:00"] },
    { day: "Sexta-feira", times: ["08:00 - 12:00", "14:00 - 22:00"] },
    { day: "Sábado", times: ["08:00 - 12:00"] },
    { day: "Domingo", times: ["08:00 - 12:00"] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="text-2xl text-black" />
          <span className="text-2xl font-bold text-black">Campus Click</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-4xl text-black" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Usuário Normal</span>
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full w-min">Aluno</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center text-2xl text-gray-600 hover:text-black">
              <FaCog />
            </button>
            <button className="flex items-center justify-center text-2xl text-gray-600 hover:text-black">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          {/* Título da seção */}
          <div className="flex items-center gap-4">
            <FaRegCalendarAlt className="text-3xl text-black" />
            <h1 className="text-2xl font-bold text-gray-800">Disponibilidade</h1>
          </div>

          {/* Seletor de Sala + Botão */}
          <div className="flex items-center gap-4">
            <div className="relative w-fit min-w-[280px]">
              <div
                className="flex items-center justify-between border border-gray-300 rounded-md cursor-pointer px-4 py-2"
                onClick={toggleDropdown}
              >
                <span className="font-bold text-sm text-gray-900">{selectedRoom.name}</span>
                <div className="flex items-center ml-3 px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">
                  <FaMapMarkerAlt className="mr-1" />
                  {selectedRoom.location}
                </div>
                <svg
                  className={`w-4 h-4 ml-3 text-gray-500 transform transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                  {mockRooms.map((room, index) => (
                    <div
                      key={index}
                      className="flex flex-col px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRoomSelect(room)}
                    >
                      <span className="text-sm font-semibold text-gray-800">{room.name}</span>
                      <span className="text-xs text-gray-600">{room.location}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm">
              Adicionar Disponibilidade
            </button>
          </div>
        </div>

        {/* Grade com disponibilidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockAvailability.map((dayData, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">{dayData.day}</h2>
              <div className="flex flex-col gap-3">
                {dayData.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                      <FaRegClock />
                      {time}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-blue-500 transition">
                        <FaEdit />
                      </button>
                      <button className="text-gray-500 hover:text-red-500 transition">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
