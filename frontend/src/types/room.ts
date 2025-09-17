export type Amenity = "Projetor" | "Quadro" | "Wifi" | "Vídeo Conferência";
export type RoomStatus = "Disponível" | "Ocupado" | "Manutenção";

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

