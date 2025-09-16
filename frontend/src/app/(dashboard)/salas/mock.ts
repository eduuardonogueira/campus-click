import { IRoom } from "@/types/room";

export const mockRooms: IRoom[] = [ 
  {
    id: 1,
    name: "SALA 101",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Disponível",
    amenities: ["Projetor", "Vídeo Conferência", "Wifi"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description:
      "Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável",
  },
  {
    id: 2,
    name: "Laboratório A",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Ocupado",
    amenities: ["Projetor", "Quadro", "Wifi"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description:
      "Sala Excelente para aulas e apresentações de times, com diversos equipamentos",
  },
  {
    id: 3,
    name: "SALA 102",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Disponível",
    amenities: ["Projetor", "Quadro", "Wifi"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description:
      "Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável",
  },
  {
    id: 4,
    name: "Laboratório B",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Manutenção",
    amenities: ["Vídeo Conferência"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description: "Sala Excelente para aulas e apresentações de times, espaço amplo e confortável",
  },
  {
    id: 5,
    name: "Laboratório C",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Manutenção",
    amenities: ["Projetor", "Wifi", "Vídeo Conferência"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description:
      "Sala Excelente para aulas e apresentações de times, com diversos equipamentos",
  },
  {
    id: 6,
    name: "Laboratório D",
    location: "Pavilhão, 1 Andar",
    capacity: 30,
    status: "Manutenção",
    amenities: ["Quadro"],
    imageUrl: "https://i.imgur.com/5sXV0QV.png",
    description:
      "Sala Excelente para aulas e apresentações de times, com diversos equipamentos e bastante confortável",
  },
];

