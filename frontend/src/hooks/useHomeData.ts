import {
  ROOMS_ROUTE,
  ADMIN_ROUTE,
  RESERVATIONS_ROUTE,
} from "@/constants/routes";

import { FaCalendar, FaSearch, FaCalendarCheck } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export function useHomeData(userRole: string) {
  const actionCardData = [
    {
      title: "Buscar Salas",
      text: "Encontre e reserve salas ou laboratórios",
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
          text: "Gerencie salas e configurações do sistema",
          buttonText: "Gerenciar sistema",
          link: ROOMS_ROUTE,
          icon: FaGear,
        }]
      : []),
  ];

  return { actionCardData };
}