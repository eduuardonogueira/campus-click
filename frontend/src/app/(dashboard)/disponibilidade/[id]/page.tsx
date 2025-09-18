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
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { AvailabilityModal } from "@/components";

type Room = {
  name: string;
  location: string;
};

type AvailabilityData = {
  day: string;
  start: string;
  end: string;
};

type AvailabilityItem = {
  day: string;
  times: string[];
};

export default function Availability() {
  const mockRooms: Room[] = [
    { name: "Sala 101", location: "Pavilhão, 2 Andar" },
    { name: "Sala 202", location: "Pavilhão, 2 Andar" },
    { name: "Laboratório A", location: "Laboratório, 1 Andar" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>(mockRooms[0]);
  const [availabilityList, setAvailabilityList] = useState<AvailabilityItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setIsDropdownOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (dayIndex: number, timeIndex: number) => {
    const time = availabilityList[dayIndex].times[timeIndex];
    setSelectedDayIndex(dayIndex);
    setSelectedTime(time);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (dayIndex: number, timeIndex: number) => {
    const time = availabilityList[dayIndex].times[timeIndex];
    setSelectedDayIndex(dayIndex);
    setSelectedTime(time);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const handleConfirmModal = (updated: AvailabilityData) => {
    const newTime = `${updated.start} - ${updated.end}`;
    const updatedList = [...availabilityList];

    if (modalMode === "edit" && selectedDayIndex !== null && selectedTime !== null) {
      const timeIndex = updatedList[selectedDayIndex].times.indexOf(selectedTime);

      if (timeIndex !== -1) {
        updatedList[selectedDayIndex].times.splice(timeIndex, 1);
        if (updatedList[selectedDayIndex].times.length === 0) {
          updatedList.splice(selectedDayIndex, 1);
        }
      }

      const existingDayIndex = updatedList.findIndex(item => item.day === updated.day);

      if (existingDayIndex !== -1) {
        updatedList[existingDayIndex].times.push(newTime);
      } else {
        updatedList.push({ day: updated.day, times: [newTime] });
      }

      setAvailabilityList(updatedList);
    } else if (modalMode === "delete" && selectedDayIndex !== null && selectedTime !== null) {
      const timeIndex = updatedList[selectedDayIndex].times.indexOf(selectedTime);
      if (timeIndex !== -1) {
        updatedList[selectedDayIndex].times.splice(timeIndex, 1);
        if (updatedList[selectedDayIndex].times.length === 0) {
          updatedList.splice(selectedDayIndex, 1);
        }
      }
      setAvailabilityList(updatedList);
    } else if (modalMode === "add") {
      const existingDay = updatedList.find(item => item.day === updated.day);
      if (existingDay) {
        existingDay.times.push(newTime);
      } else {
        updatedList.push({ day: updated.day, times: [newTime] });
      }
      setAvailabilityList(updatedList);
    }

    setIsModalOpen(false);
    setSelectedDayIndex(null);
    setSelectedTime(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDayIndex(null);
    setSelectedTime(null);
  };

  const defaultValues: Partial<{
    defaultDay: string;
    defaultStart: string;
    defaultEnd: string;
  }> =
    selectedDayIndex !== null && selectedTime !== null
      ? {
          defaultDay: availabilityList[selectedDayIndex].day,
          defaultStart: selectedTime.split(" - ")[0],
          defaultEnd: selectedTime.split(" - ")[1],
        }
      : {};

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="p-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <FaRegCalendarAlt className="text-3xl text-black" />
            <h1 className="text-2xl font-bold text-gray-800">Disponibilidade</h1>
          </div>

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
                <FaChevronDown className="ml-3 text-gray-500 text-xs" />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                  {mockRooms.map((room, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRoomSelect(room)}
                    >
                      <span className="text-sm font-semibold text-gray-800">{room.name}</span>
                      <span className="block text-xs text-gray-600">{room.location}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              id="add-btn"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              onClick={openAddModal}
            >
              Adicionar Disponibilidade
            </button>
          </div>
        </div>

        {availabilityList.length === 0 || availabilityList.every((item) => item.times.length === 0) ? (
          <div className="flex flex-col items-center justify-center text-center py-20 w-full border rounded-lg border-gray-300">
            <FaRegCalendarAlt className="text-5xl text-gray-400 mb-4" />
            <h2 className="text-lg font-bold text-gray-800 mb-2">Sem Disponibilidade Atualmente</h2>
            <p className="text-sm text-gray-500 mb-6">
              Você não criou nenhuma disponibilidade para essa sala no momento
            </p>
            <button
              onClick={() => document.getElementById("add-btn")?.click()}
              className="px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
            >
              Criar agora!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {availabilityList.map((dayData, dayIndex) => (
              <div key={dayIndex} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">{dayData.day}</h2>
                <div className="flex flex-col gap-3">
                  {dayData.times.map((time, timeIndex) => (
                    <div key={timeIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                        <FaRegClock />
                        {time}
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-blue-500" onClick={() => openEditModal(dayIndex, timeIndex)}>
                          <FaEdit />
                        </button>
                        <button className="text-gray-500 hover:text-red-500" onClick={() => openDeleteModal(dayIndex, timeIndex)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AvailabilityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        onConfirm={handleConfirmModal}
        defaultDay={defaultValues.defaultDay}
        defaultStart={defaultValues.defaultStart}
        defaultEnd={defaultValues.defaultEnd}
      />
    </div>
  );
}
