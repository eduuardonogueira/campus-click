"use server";
import { createReservation } from "@/api/reservation";
import { Reservation } from "@/types/reservation";

export const seedAppointments = async () => {
  const exampleAppointments: Omit<Reservation, "id">[] = [
    {
      order: 1,
      status: "PENDING",
      date: "2025-09-18",
      startTime: "08:00",
      endTime: "09:00",
      details: "Reunião importante",
      title: "Reunião 1",
      userId: 2,
      roomId: 15,
    },
    {
      order: 2,
      status: "PENDING",
      date: "2025-09-19",
      startTime: "10:00",
      endTime: "11:00",
      details: "Discussão de projeto",
      title: "Reunião 2",
      userId: 21,
      roomId: 2,
    },
    {
      order: 3,
      status: "PENDING",
      date: "2025-09-20",
      startTime: "14:00",
      endTime: "15:00",
      details: "Planejamento semanal",
      title: "Reunião 3",
      userId: 24,
      roomId: 3,
    },
  ];

  for (const appointment of exampleAppointments) {
    const result = await createReservation(appointment);
    if (result) console.log("Reserva criada:", result);
    else console.log("Falha ao criar reserva:", appointment);
  }
};

seedAppointments()
  .then(() => console.log("Seed finalizado"))
  .catch((err) => console.error("Erro no seed:", err));
