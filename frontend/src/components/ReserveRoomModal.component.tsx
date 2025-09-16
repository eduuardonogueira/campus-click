"use client";
import { useState } from "react";
import { FaUserFriends, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

interface ReserveRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    room: {
        name: string;
        location: string;
        capacity: number;
    } | null;
}

export function ReserveRoomModal({ isOpen, onClose, room }: ReserveRoomModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    const timeOptionsStart = ["08:00", "09:00", "10:00", "11:00", "12:00"];
    const timeOptionsEnd = ["09:00", "10:00", "11:00", "12:00", "14:00"];

    if (!isOpen || !room) return null;

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => {
            if (field === "startTime") {
                return { ...prev, [field]: value, endTime: "" };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.startTime && formData.endTime) {
            const start = parseInt(formData.startTime.replace(":", ""), 10);
            const end = parseInt(formData.endTime.replace(":", ""), 10);

            if (end <= start) {
                alert("O horário de término deve ser maior que o horário de início.");
                return;
            }
        }

        console.log("Reserva criada:", {
            room: room.name,
            location: room.location,
            capacity: room.capacity,
            ...formData,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full min-w-[380px] p-6">
                <h2 className="text-xl font-bold mb-1">Reservar {room.name}</h2>
                <p className="text-gray-400 mb-4">Agende sua reserva nesta sala</p>

                {/* Dados da Sala */}
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

                {/* Formulário */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium">Título Reunião</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 placeholder-gray-600"
                            placeholder="Escreva o título"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Descrição (Opcional)</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
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
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Hora de Início */}
                        <div className="relative flex-1">
                            <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
                            <label className="text-sm font-medium">Hora de Início</label>
                            <select
                                value={formData.startTime}
                                onChange={(e) => handleChange("startTime", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 appearance-none pr-10 pl-3"
                            >
                                <option value="">Selecione a hora</option>
                                {timeOptionsStart.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Hora do Término */}
                        <div className="relative flex-1">
                            <FaChevronDown className="absolute right-3 top-9 text-gray-400 pointer-events-none" />
                            <label className="text-sm font-medium">Hora do Término</label>
                            <select
                                value={formData.endTime}
                                onChange={(e) => handleChange("endTime", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 appearance-none pr-10 pl-3"
                                disabled={!formData.startTime}
                            >
                                <option value="">Selecione a hora</option>
                                {timeOptionsEnd
                                    .filter((time) => !formData.startTime || time > formData.startTime)
                                    .map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white border rounded hover:invert"
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
