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
  const [name, setName] = useState(sala.name);
  const [location, setLocation] = useState(sala.location);
  const [capacity, setCapacity] = useState(sala.capacity);
  const [description, setDescription] = useState(sala.description);
  const [status, setStatus] = useState<RoomStatus>(sala.status);
  const [amenities, setAmenities] = useState<Amenity[]>(sala.amenities || []);

  if (!isOpen) return null;

  const toggleAmenity = (amenity: Amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // enviar para o estado pai conforme nossa arquitetura
    console.log({ name, location, capacity, description, status, amenities });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6">
        <h2 className="text-xl font-bold">Editar Sala</h2>
        <p className="text-gray-400 mb-4">
          Atualize e configure as informações da sala
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Nome da Sala</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md border-gray-300 p-2 w-full min-w-[250px] text-sm text-gray-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Capacidade</label>
              <input
                type="number"
                value={capacity === 0 ? "" : capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 border rounded-md border-gray-300 p-2 text-sm text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as EnumRoomStatus)}
              className="min-w-[60px] h-10 border rounded-md border-gray-300 p-2 text-sm text-gray-600 appearance-none pr-10 pl-3"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recursos</label>
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
                    className={`flex bg-gray-200 items-center gap-1 px-2 py-1 rounded-md text-sm cursor-pointer text-gray-600 font-medium transition ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "text-black-700 hover:bg-gray-200"
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

// Modal de confirmação para exclusão
export function DeleteRoomModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[650px] p-6">
        <h2 className="text-xl font-bold mb-4">Excluir Sala</h2>
        <p className="">Tem certeza que deseja excluir?</p>
        <p className="mb-4">
          Esta ação não pode ser desfeita e cancelará todas as reservas
          associadas.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-black cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

