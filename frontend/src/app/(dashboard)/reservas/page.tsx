"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import {
  DeleteReservationModal,
  EmptyReservations,
  ReservationCard,
} from "@/components/index";
import { ROOMS_ROUTE } from "@/constants/routes";
import { Reservation } from "@/types/reservation";
import { fetchReservations, deleteReservation } from "@/api/reservation";
import { toast } from "react-toastify";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReservations = async () => {
      const data = await fetchReservations();
      if (data) setReservations(data);
      setLoading(false);
    };
    loadReservations();
  }, []);

  const handleRequestDelete = (id: number) => {
    const reservation = reservations.find((r) => r.id === id) || null;
    setSelectedReservation(reservation);
  };

  const handleConfirmDelete = async () => {
    if (!selectedReservation) return;

    const success = await deleteReservation(selectedReservation.id);
    if (success) {
      setReservations(prev => prev.filter(r => r.id !== selectedReservation.id));
      setSelectedReservation(null);
      toast.success("Reserva cancelada com sucesso!");
    } else {
      toast.error("Erro ao cancelar a reserva.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 box-border my-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Calendar size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Minhas Reservas</h1>
        </div>
        <div className="relative flex items-center">
          <FaFilter className="absolute left-4 text-gray-500" />
          <select className="min-w-[220px] pl-10 pr-4 h-10 rounded-lg border border-gray-600 bg-gray-50 text-base text-gray-900 appearance-none">
            <option>Filtros</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </header>

      <main>
        {loading ? (
          <p>Carregando reservas...</p>
        ) : reservations.length > 0 ? (
          <div className="flex flex-col gap-4">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onDelete={handleRequestDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyReservations
            title="Sem Reservas Atualmente"
            message="Você não agendou nenhuma sala no momento"
            buttonText="Agendar Agora"
            buttonHref={ROOMS_ROUTE}
          />
        )}
      </main>

      <DeleteReservationModal
        isOpen={!!selectedReservation}
        reservationTitle={selectedReservation?.title}
        onClose={() => setSelectedReservation(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
