"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import { EmptyState, DeleteReservationModal, ReservationCard } from "@/components/index";
import { mockReservations } from "./mock";
import { ROOMS_ROUTE } from "@/constants/routes";
import { Reservation } from "@/types/reservation";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleRequestDelete = (id: number) => {
    const reservation = reservations.find((r) => r.id === id) || null;
    setSelectedReservation(reservation);
  };
  
  const handleConfirmDelete = () => {
    if (selectedReservation) {
      setReservations((prev) => prev.filter((r) => r.id !== selectedReservation.id));
      setSelectedReservation(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 box-border my-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Calendar size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Minhas Reservas</h1>
        </div>
        <div className="flex relative">
          <FaFilter className="absolute left-3 top-3 text-gray-500" />
          <select className={styles.filters}>
            <option>Filtros</option>
          </select>
        </div>
      </header>

      {/* Conteúdo */}
      <main>
        {reservations.length > 0 ? (
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

      {/* Modal */}
      <DeleteReservationModal
        isOpen={!!selectedReservation}
        reservationTitle={selectedReservation?.titulo}
        onClose={() => setSelectedReservation(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
