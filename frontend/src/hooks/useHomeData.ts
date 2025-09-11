// src/hooks/useHomeData.ts
import {
  ROOMS_ROUTE,
  ADMIN_ROUTE,
  RESERVATIONS_ROUTE,
} from "@/constants/routes";

import { FaSearch, FaCalendarCheck } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import type { IconType } from "react-icons";

type UserRole = "user" | "admin";

type ActionCardItem = {
  title: string;
  text: string;
  buttonText: string;
  link: string;
  icon: IconType;
};

export function useHomeData(userRole: UserRole): { actionCardData: ActionCardItem[] } {
  const actionCardData: ActionCardItem[] = [
    {
      title: "Reserva de Salas",
      text: "Encontre e reserve salas ou laboratórios do pavilhão",
      buttonText: "Procurar salas disponíveis",
      link: ROOMS_ROUTE,
      icon: FaSearch,
    },
    {
      title: "Minhas Reservas",
      text: "Encontre suas reservas por dia e horário",
      buttonText: "Ver Reservas",
      link: RESERVATIONS_ROUTE,
      icon: FaCalendarCheck,
    },
    ...(userRole === "admin"
      ? [{
          title: "Painel de Administração",
          text: "Gerencie salas, usuários e configurações do sistema",
          buttonText: "Gerenciar sistema",
          link: ADMIN_ROUTE,
          icon: FaGear,
        }]
      : []),
  ];

  return { actionCardData };
}
