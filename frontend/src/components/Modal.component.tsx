"use client";
import {
  FaTv,
  FaChalkboardTeacher,
  FaWifi,
  FaVideo,
} from "react-icons/fa";
import { useState } from "react";
import { IRoom, Amenity } from "@/types/room";

const amenityIcons: Record<Amenity, React.ReactNode> = {
  Projetor: <FaTv />,
  Quadro: <FaChalkboardTeacher />,
  Wifi: <FaWifi />,
  "Vídeo Conferência": <FaVideo />,
};

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
  const [status, setStatus] = useState(sala.status);
  const [amenities, setAmenities] = useState<Amenity[]>(sala.amenities || []);

  if (!isOpen) return null;

  const toggleAmenity = (amenity: Amenity) => {
    setAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados atualizados para o backend ou atualizar o estado pai
    console.log({ name, location, capacity, description, status, amenities });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Editar Sala</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Nome da Sala</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-40 border rounded p-2 w-full min-w-[250px]"
              />
            </div>

            {/* Capacidade */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Capacidade</label>
              <input
                type="number"
                value={capacity}
                onChange={e => setCapacity(Number(e.target.value))}
                className="w-20 border rounded p-2 w-full min-w-[30px]"
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
              className="min-w-[60px] border rounded p-2"
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
                    className={`border flex items-center gap-1 px-2 py-1 rounded text-x font-medium transition ${isSelected
                        ? "bg-black text-white"
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
              className="border px-4 py-2 bg-black text-white rounded hover:invert-100"
            >
              Salvar Edição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// Modal de confirmação para exclusão
export function DeleteRoomModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Excluir Sala</h2>
        <p className="mb-6">Tem certeza que deseja excluir esta sala?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-black"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}