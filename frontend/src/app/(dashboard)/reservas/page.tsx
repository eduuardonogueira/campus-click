"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import { ReservationCard } from "@/components/ReservationCard.component";
import { DeleteReservationModal } from "@/components/DeleteReservationModal.component";
import { EmptyState } from "@/components/EmptyState";
import { mockReservations } from "./mock";
import { ROOMS_ROUTE } from "@/constants/routes";
import styles from "./page.module.css";
import { Reservation } from "@/types/reservation";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleRequestDelete = (id: string) => {
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
    <div className={styles.mainContainer}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Calendar size={32} />
          <h1>Minhas Reservas</h1>
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
          <div className={styles.reservationsList}>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onDelete={handleRequestDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
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
