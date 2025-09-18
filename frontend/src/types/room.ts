export type Amenity = "Projetor" | "Quadro" | "Wifi" | "Vídeo Conferência";
export type RoomStatus = "available" | "scheduled" | "maintenance";

export enum EnumRoomStatus {
  AVAILABLE = "available",
  OCCUPIED = "scheduled",
  MAINTENANCE = "maintenance",
}

export interface IRoom {
  id: number;
  name: string;
  location: string;
  capacity: number;
  description: string;
  amenities: Amenity[];
  status: RoomStatus;
  imageUrl: string;
}

