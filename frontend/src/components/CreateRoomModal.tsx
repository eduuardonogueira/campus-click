"use client";
import { useState } from "react";
import { Amenity } from "@/types/room";
import { FaTv, FaChalkboardTeacher, FaWifi, FaVideo } from "react-icons/fa";

const amenityIcons: Record<Amenity, React.ReactNode> = {
    Projetor: <FaTv />,
    Quadro: <FaChalkboardTeacher />,
    Wifi: <FaWifi />,
    "Vídeo Conferência": <FaVideo />,
};

export function CreateRoomModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Disponível");
    const [amenities, setAmenities] = useState<Amenity[]>([]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nova Sala:", { name, location, capacity, description, status, amenities });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Criar Nova Sala</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Nome + Capacidade */}
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Nome da Sala</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="border rounded p-2 min-w-[250px]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Capacidade</label>
                            <input
                                type="text"
                                value={capacity === 0 ? "" : capacity}
                                onChange={e => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setCapacity(value === "" ? 0 : Number(value));
                                    }
                                }}
                                className="border rounded p-2 min-w-[60px] [appearance:textfield]"
                                inputMode="numeric"
                            />
                        </div>
                    </div>

                    {/* Localização */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Localização</label>
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="border rounded p-2"
                        >
                            <option>Disponível</option>
                            <option>Reservada</option>
                            <option>Manutenção</option>
                        </select>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Amenities</label>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {Object.keys(amenityIcons).map((amenityKey) => {
                                const amenity = amenityKey as Amenity;
                                const isSelected = amenities.includes(amenity);

                                return (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() =>
                                            setAmenities((prev) =>
                                                prev.includes(amenity)
                                                    ? prev.filter((a) => a !== amenity)
                                                    : [...prev, amenity]
                                            )
                                        }
                                        className={`border flex items-center gap-1 px-2 py-1 rounded transition ${isSelected ? "bg-black text-white" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        {amenityIcons[amenity]} {amenity}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="border px-4 py-2 bg-black text-white rounded hover:invert"
                        >
                            Criar Sala
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
