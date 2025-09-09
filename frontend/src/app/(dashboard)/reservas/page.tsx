import { Calendar } from 'lucide-react';
import { ReservationCard } from '@/components/ReservationCard.component';
import { mockReservations } from './mock';
import styles from './page.module.css';
import { EmptyState } from '@/components/EmptyState';
import { ROOMS_ROUTE } from '@/constants/routes'; 

export default function MyReservationsPage() {
  const reservations = mockReservations;

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Calendar size={32} />
          <h1>Minhas Reservas</h1>
        </div>
        <div className={styles.filters}>
          Filtros
        </div>
      </header>

      <main>
        {reservations.length > 0 ? (
          <div className={styles.reservationsList}>
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
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
    </div>
  );
}