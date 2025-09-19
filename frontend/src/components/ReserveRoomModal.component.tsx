"use client";
import { createAppointment, getRoomDetails } from "@/api/appointments";
import { getAvailableTimes } from "@/hooks/useAppointment";
import { EnumAppointmentStatus, ICreateAppointment } from "@/types/appointment";
import { IRoom, IRoomDetails } from "@/types/room";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { FaUserFriends, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

interface ReserveRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: IRoom;
  user: IUser;
}

export function ReserveRoomModal({
  isOpen,
  onClose,
  room,
  user,
}: ReserveRoomModalProps) {
  const [formData, setFormData] = useState<ICreateAppointment>({
    order: 1,
    status: EnumAppointmentStatus.PENDING,
    title: "",
    details: "",
    date: "",
    startTime: "",
    endTime: "",
    userId: user.id,
    roomId: room.id,
  });

  const [roomDetails, setRoomDetails] = useState<IRoomDetails>();

  const availableTimes = roomDetails
    ? getAvailableTimes(roomDetails, formData.date)
    : [];

  async function fetchRoomDetails() {
    try {
      const response = await getRoomDetails(room.id);

      if (response) setRoomDetails(response);
    } catch (error) {
      toast.error("Erro ao buscar informações do agendamento");
    }
  }

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field === "startTime") {
        return { ...prev, [field]: value, endTime: "" };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.startTime && formData.endTime) {
      const start = parseInt(formData.startTime.replace(":", ""), 10);
      const end = parseInt(formData.endTime.replace(":", ""), 10);

      if (end <= start) {
        alert("O horário de término deve ser maior que o horário de início.");
        return;
      }

      try {
        const response = await createAppointment(formData);

        if (response) toast.success("Agendamento criado com sucesso!");
      } catch (error) {
        toast.error("Erro ao criar agendamento");
      }
    }

    onClose();
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full min-w-[380px] p-6">
        <h2 className="text-xl font-bold mb-1">Reservar {room.name}</h2>
        <p className="text-gray-400 mb-4">Agende sua reserva nesta sala</p>

        <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col gap-2 bg-gray-100">
          <strong className="font-semibold">{room.name}</strong>

          <div className="flex items-start text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-gray-600" />
              {room.location}
            </div>

            <div className="flex items-center ml-3 gap-2">
              <FaUserFriends className="text-gray-600" />
              {room.capacity} Pessoas
            </div>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Título Reunião</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 placeholder-gray-600"
              placeholder="Escreva o título"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Detalhes (Opcional)</label>
            <textarea
              value={formData.details}
              onChange={(e) => handleChange("details", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 placeholder-gray-600"
              placeholder="Adicione detalhes adicionais sobre a reunião"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Data</label>
            <div className="flex items-center max-w-[220px] border border-gray-300 rounded-lg p-2">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="flex-1 outline-none text-sm text-gray-600"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              <label className="text-sm font-medium">Hora de Início</label>
              <select
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 appearance-none pr-10 pl-3 cursor-pointer"
                required
              >
                <option value="">Selecione a hora</option>
                {availableTimes.map((slot) => (
                  <option key={slot.start} value={slot.start}>
                    {slot.start}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
              <label className="text-sm font-medium">Hora do Término</label>
              <select
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 appearance-none pr-10 pl-3 cursor-pointer"
                disabled={!formData.startTime}
                required
              >
                <option value="">Selecione a hora</option>
                {availableTimes
                  .filter((slot) => slot.start >= formData.startTime)
                  .map((slot) => (
                    <option key={slot.end} value={slot.end}>
                      {slot.end}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-red-400 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white border rounded hover:invert cursor-pointer"
              disabled={!formData.startTime || !formData.endTime}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

