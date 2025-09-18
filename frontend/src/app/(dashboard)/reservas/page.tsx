<<<<<<< HEAD
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
=======
import { Calendar } from 'lucide-react';
import { ReservationCard } from '@/components/ReservationCard.component';
import { mockReservations } from './mock';
import { EmptyReservations } from '@/components/EmptyReservations/EmptyReservations';
import { ROOMS_ROUTE } from '@/constants/routes'; 
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d

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
<<<<<<< HEAD
    <div className={styles.mainContainer}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
=======
    <div className="max-w-4xl mx-auto px-6 box-border my-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d
          <Calendar size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Minhas Reservas</h1>
        </div>
<<<<<<< HEAD
        <div className="flex relative">
          <FaFilter className="absolute left-3 top-3 text-gray-500" />
          <select className={styles.filters}>
            <option>Filtros</option>
          </select>
=======
        <div className="relative">
          <div className="border border-gray-300 rounded-md py-2 px-4 min-w-[200px] flex justify-between items-center text-gray-600 bg-white cursor-pointer hover:bg-gray-50 text-sm">
            Filtros
          </div>
>>>>>>> 691f7d1172d7542cbb9d9a1c6fe22e83d46d565d
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
