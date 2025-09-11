import { Calendar } from 'lucide-react';
import { ReservationCard } from '@/components/ReservationCard.component';
import { mockReservations } from './mock';
import { EmptyState } from '@/components/EmptyReservations/EmptyReservations';
import { ROOMS_ROUTE } from '@/constants/routes'; 

export default function MyReservationsPage() {
  const reservations = mockReservations;

  return (
    <div className="max-w-4xl mx-auto px-6 box-border my-10">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Calendar size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Minhas Reservas</h1>
        </div>
        <div className="relative">
          <div className="border border-gray-300 rounded-md py-2 px-4 min-w-[200px] flex justify-between items-center text-gray-600 bg-white cursor-pointer hover:bg-gray-50 text-sm">
            Filtros
          </div>
        </div>
      </header>

      <main>
        {reservations.length > 0 ? (
          <div className="flex flex-col gap-4">
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