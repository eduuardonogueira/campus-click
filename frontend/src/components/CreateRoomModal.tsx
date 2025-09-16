"use client";
import { useState } from "react";
import { Amenity } from "@/types/room";
import { FaTv, FaChalkboardTeacher, FaWifi, FaVideo, FaChevronDown } from "react-icons/fa";

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
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: 0,
    description: "",
    status: "Disponível",
    amenities: [] as Amenity[],
  });

  if (!isOpen) return null;

  const handleChange = (field: string, value: string | number | Amenity[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova Sala:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6">
        <h2 className="text-xl font-bold">Criar Nova Sala</h2>
        <p className="text-gray-400 mb-4">Crie e configure as informações da sala</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nome + Capacidade */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium mb-1">Nome da Sala</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border rounded-lg border-gray-300 p-2 w-full text-sm text-gray-600"
              />
            </div>

            <div className="flex flex-col w-28">
              <label className="text-sm font-medium mb-1">Capacidade</label>
              <input
                type="text"
                value={formData.capacity === 0 ? "" : formData.capacity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleChange("capacity", value === "" ? 0 : Number(value));
                  }
                }}
                className="border rounded-lg border-gray-300 p-2 text-sm text-gray-600 [appearance:textfield]"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium mb-1">Localização</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border rounded-lg p-2 border-gray-300 text-sm text-gray-600"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full h-20 border rounded-lg p-2 border-gray-300 text-sm text-gray-600 text-sm text-gray-600"
            />
          </div>

          {/* Status */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-32 h-10 border border-gray-300 text-sm rounded-lg p-2 text-gray-600 appearance-none pr-10 pl-3"
            >
              <option>Disponível</option>
              <option>Reservada</option>
              <option>Manutenção</option>
            </select>
            {/* Ícone da seta */}
            <FaChevronDown className="absolute left-25 top-9 text-gray-400 pointer-events-none" />
          </div>

          {/* Amenities */}
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
                    onClick={() => {
                      handleChange(
                        "amenities",
                        isSelected
                          ? formData.amenities.filter((a) => a !== amenity)
                          : [...formData.amenities, amenity]
                      );
                    }}
                    className={`bg-gray-200 flex items-center gap-1 px-2 py-1 rounded-xl text-sm text-gray-600 transition ${
                      isSelected ? "bg-gray-900 text-white" : "hover:bg-gray-300"
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
              className="px-4 py-2 border border-gray-400 bg-white rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="border px-4 py-2 w-23 bg-black text-white rounded hover:invert"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
