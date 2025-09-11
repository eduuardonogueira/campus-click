// @/hooks/useHomeData.ts
import {
  ROOMS_ROUTE,
  ADMIN_ROUTE,
  RESERVATIONS_ROUTE,
} from "@/constants/routes";

import { FaCalendar, FaSearch, FaCalendarCheck } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

type UserRole = "user" | "admin";

export function useHomeData() {
  const userRole: UserRole = "user"; // Mudar pra "admin" pra testar

  const actionCardData = [
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
    ...(userRole === "user"
      ? [
          {
            title: "Painel de Administração",
            text: "Gerencie salas, usuários e configurações do sistema",
            buttonText: "Gerenciar sistema",
            link: ADMIN_ROUTE,
            icon: FaGear,
          },
        ]
      : []),
  ];

  return { actionCardData };
}