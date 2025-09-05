import { ROOMS_ROUTE, ADMIN_ROUTE } from "@/constants/routes";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export function useHomeData() {
  const actionCardData = [
    {
      title: "Reserva de Salas",
      text: "Encontre e reserve salas ou laboratórios",
      buttonText: "Procurar salas disponíveis",
      link: ROOMS_ROUTE,
      icon: FaCalendar,
    },
    {
      title: "Buscar e Filtrar",
      text: "Encontre salas por capacidade, recursos e disponibilidade",
      buttonText: "Filtro avançado",
      link: ROOMS_ROUTE,
      icon: FaSearch,
    },
    {
      title: "Painel de Administração",
      text: "Gerencie salas, usuários e configurações do sistema",
      buttonText: "Gerenciar sistema",
      link: ADMIN_ROUTE,
      icon: FaGear,
    },
  ];

  return { actionCardData };
}

