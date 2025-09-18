"use client";
import {
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import { IRoom, Amenity, RoomStatus, EnumRoomStatus } from "@/types/room";

const amenityIcons: Record<Amenity, React.ReactNode> = {
  Projetor: <FaTv />,
  Quadro: <FaChalkboardTeacher />,
  Wifi: <FaWifi />,
  "Vídeo Conferência": <FaVideo />,
};

interface StatusOption {
  label: string;
  value: EnumRoomStatus;
}

const STATUS_OPTIONS: StatusOption[] = [
  { label: "Disponível", value: EnumRoomStatus.AVAILABLE },
  { label: "Ocupado", value: EnumRoomStatus.OCCUPIED },
  { label: "Manutenção", value: EnumRoomStatus.MAINTENANCE },
];

export function EditRoomModal({
  sala,
  isOpen,
  onClose,
}: {
  sala: IRoom;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: sala.name,
    location: sala.location,
    capacity: sala.capacity,
    description: sala.description,
    status: sala.status,
    amenities: sala.amenities || [] as Amenity[],
  });

  if (!isOpen) return null;

  const handleChange = (field: string, value: string | number | Amenity[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: Amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Atualizando sala:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6 relative">
        <h2 className="text-xl font-bold">Editar Sala</h2>
        <p className="text-gray-400 mb-4">
          
          Atualize e configure as informações da sala
        
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium mb-1">Nome da Sala</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border rounded-md border-gray-300 p-2 w-full min-w-[250px] text-sm text-gray-600"
              />
            </div>

            {/* Capacidade */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Capacidade</label>
              <input
                type="number"
                value={formData.capacity === 0 ? "" : formData.capacity}
                onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
                className="border rounded-md border-gray-300 p-2 min-w-[60px] text-sm text-gray-600 [appearance:textfield]"
                inputMode="numeric"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Localização
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border rounded-md  border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full h-20 border rounded-md border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="min-w-[60px] h-10 border rounded-md border-gray-300 p-2 text-sm text-gray-600 appearance-none pr-10 pl-3"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute left-25 top-9 text-gray-400 pointer-events-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recursos</label>
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(amenityIcons).map((amenityKey) => {
                const amenity = amenityKey as Amenity;
                const isSelected = formData.amenities.includes(amenity);

                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium cursor-pointer transition ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {amenityIcons[amenity]}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 bg-white rounded-md hover:bg-gray-300 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="border px-4 py-2 bg-black text-white rounded-md hover:invert cursor-pointer"
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
