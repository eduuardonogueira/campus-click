"use client";
import {
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import { IRoom, Amenity, EnumRoomStatus } from "@/types/room";

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
    newAmenities: [] as string[],
    newAmenity: "",
  });

  if (!isOpen) return null;

  const handleChange = (field: string, value: string | number | Amenity[] | string[]) => {
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

  const handleAddAmenity = () => {
    const value = formData.newAmenity.trim();
    if (value && !formData.newAmenities.includes(value)) {
      handleChange("newAmenities", [...formData.newAmenities, value]);
      handleChange("newAmenity", "");
    }
  };

  const removeNewAmenity = (amenity: string) => {
    handleChange(
      "newAmenities",
      formData.newAmenities.filter((a) => a !== amenity)
    );
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
          {/* Nome e Capacidade */}
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

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium mb-1">Localização</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border rounded-md border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full h-20 border rounded-md border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          {/* Status */}
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

          {/* Botões de seleção de amenities existentes */}
          <div>
            <label className="block text-sm font-medium mb-2">Recursos</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(amenityIcons).map((amenityKey) => {
                const amenity = amenityKey as Amenity;
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-medium transition ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {amenityIcons[amenity]} {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input de texto para novas amenities */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1"></label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Adicione recursos customizados"
                value={formData.newAmenity}
                onChange={(e) => handleChange("newAmenity", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
                className="border rounded-md border-gray-400 p-2 text-sm text-gray-600 flex-1 placeholder:text-sl"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-3 py-1 bg-black text-white text-xs rounded-md cursor-pointer hover:bg-gray-900"
              >
                Adicionar
              </button>
            </div>
          </div>

          {/* Mostrar amenities customizadas abaixo do input */}
          {formData.newAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.newAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => removeNewAmenity(amenity)}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-medium bg-gray-900 text-white"
                >
                  {amenity} ✕
                </button>
              ))}
            </div>
          )}

          {/* Botões cancelar/atualizar */}
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
