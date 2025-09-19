"use client";

import { useEffect, useState } from "react";
import {
  EnumRoomStatus,
  EnumRoomType,
  IAmenity,
  ICreateRoom,
  IRoomWithAmenities,
  RoomStatus,
} from "@/types/room";
import { FaChevronDown } from "react-icons/fa";
import { getAmenities } from "@/api/amenity";
import { createRoom, updateRoom } from "@/api/room";
import { toast } from "react-toastify";

interface ICreateEditRoomModal {
  isOpen: boolean;
  onClose: () => void;
  roomData?: IRoomWithAmenities;
  roomId: number;
  action: "create" | "update";
}

export function CreateEditRoomModal({
  isOpen,
  onClose,
  roomData,
  action,
  roomId,
}: ICreateEditRoomModal) {
  const EMPTY_FORM_DATA: ICreateRoom = {
    name: "",
    location: "",
    capacity: 0,
    duration: 0,
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description: "",
    status: EnumRoomStatus.AVAILABLE,
    type: EnumRoomType.ROOM,
    amenities: [],
  };

  const DEFAULT_FORM_DATA: ICreateRoom = roomData
    ? {
        ...roomData,
        amenities: roomData.amenities.map((a) => a.id),
      }
    : EMPTY_FORM_DATA;

  const [formData, setFormData] = useState<ICreateRoom>(DEFAULT_FORM_DATA);

  const [amenities, setAmenities] = useState<IAmenity[] | null>();

  async function fetchAmenities() {
    try {
      const response = await getAmenities();

      if (response) {
        setAmenities(response);
      }
    } catch (error) {
      const message = "Erro ao buscar amenities";
      toast.error(message);
      console.error(message, error);
    }
  }

  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    const newFormData: ICreateRoom = roomData
      ? {
          ...roomData,
          amenities: roomData.amenities.map((a) => a.id),
        }
      : EMPTY_FORM_DATA;

    setFormData(newFormData);
  }, [roomData, action]);

  if (!isOpen) return null;

  const handleChange = (
    field: string,
    value: string | number | IAmenity[] | RoomStatus
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: IAmenity) => {
    if (!formData.amenities) {
      setFormData((prev) => ({ ...prev, amenities: [amenity.id] }));
      return;
    }

    const isSelected = formData.amenities.some(
      (amenityId) => amenityId === amenity.id
    );

    if (isSelected) {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities
          ? prev.amenities.filter((amenityId) => amenityId !== amenity.id)
          : [],
      }));
    } else {
      // adiciona
      const selectedAmenities = formData.amenities;
      setFormData((prev) => ({
        ...prev,
        amenities: [...selectedAmenities, amenity.id],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await (action === "create"
        ? createRoom(formData)
        : updateRoom(formData, roomId));

      if (data)
        toast.success(
          `Sala ${action === "create" ? "criada" : "atualizada"} com sucesso!`
        );
    } catch (error) {
      toast.error(
        `Erro ao ${action === "create" ? "criar" : "atualizar"} sala ${error}`
      );
    }
    setFormData(DEFAULT_FORM_DATA);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg min-w-[380px] max-w-lg p-6">
        <h2 className="text-xl font-bold">
          {action === "create" ? "Criar Sala" : "Editar Sala"}
        </h2>
        <p className="text-gray-400 mb-4">
          {action === "create"
            ? "Crie e configure as informações da sala"
            : "Atualize e configure as informações da sala"}
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">Nome da Sala</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border rounded-md p-2 w-full border-gray-300 text-sm text-gray-600"
              placeholder="Sala 01"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Capacidade</label>
              <input
                type="number"
                value={formData.capacity === 0 ? 0 : formData.capacity}
                onChange={(e) =>
                  handleChange("capacity", parseInt(e.target.value))
                }
                className="border rounded-md p-2 min-w-[60px] [appearance:textfield] border-gray-300 text-sm text-gray-600"
                inputMode="numeric"
                placeholder="30"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">
                Duração (minutos)
              </label>
              <input
                type="number"
                value={formData.duration === 0 ? 0 : formData.duration}
                onChange={(e) =>
                  handleChange("duration", parseInt(e.target.value))
                }
                className="border rounded-md p-2 min-w-[60px] [appearance:textfield] border-gray-300 text-sm text-gray-600"
                inputMode="numeric"
                placeholder="30"
                required
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
              className="w-full border rounded-md p-2 border-gray-300 text-sm text-gray-600"
              placeholder="Prédio 101"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border rounded-md p-2 border-gray-300 text-sm text-gray-600"
              placeholder="Sala ao lado do banheiro..."
              required
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="border rounded-md p-2 border-gray-300appearance-none pr-10 pl-3 text-sm text-gray-600 cursor-pointer"
                required
              >
                <option value={EnumRoomStatus.AVAILABLE}>Disponível</option>
                <option value={EnumRoomStatus.OCCUPIED}>Reservada</option>
                <option value={EnumRoomStatus.MAINTENANCE}>Manutenção</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="border rounded-md p-2 border-gray-300appearance-none pr-10 pl-3 text-sm text-gray-600 cursor-pointer"
                required
              >
                <option value={EnumRoomType.ROOM}>Sala</option>
                <option value={EnumRoomType.LABORATORY}>Laboratório</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recursos</label>
            <div className="flex flex-wrap gap-2 mb-6">
              {amenities?.map((amenity) => {
                const isSelected = formData.amenities?.some(
                  (a) => a === amenity.id
                );

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-xl cursor-pointer text-sm transition ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                    }`}
                  >
                    {amenity.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 bg-white rounded cursor-pointer hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="border px-4 py-2 bg-black text-white rounded cursor-pointer hover:invert"
            >
              {action === "create" ? "Criar" : "Atualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

