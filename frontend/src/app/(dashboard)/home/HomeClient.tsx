"use client";

import { useHomeData } from "@/hooks/useHomeData";
import { useUser } from "@/hooks/useUser";
import ActionCard from "@/app/(dashboard)/home/ActionCard";
import StatsCard from "@/app/(dashboard)/home/StatsCard";
import { statsMock } from "@/app/(dashboard)/home/mock";

export default function HomeClient() {
  const { userRole } = useUser();
  const { actionCardData } = useHomeData(userRole);

  return (
    <>
      <section className="flex flex-col gap-2 items-center mt-10">
        <h2 className="text-3xl font-bold">Seja Bem vindo ao Campus Click</h2>
        <h3 className="text-md text-gray-800">
          Gerenciamento e reserva de salas e laboratórios de forma simples,
          prática e acessível para toda a comunidade acadêmica.
        </h3>
      </section>

      <section className="flex gap-4">
        {actionCardData.map((data, index) => (
          <ActionCard
            key={index}
            title={data.title}
            icon={data.icon}
            text={data.text}
            buttonText={data.buttonText}
            link={data.link}
          />
        ))}
      </section>

      <section className="flex flex-col gap-4 items-center">
        <h3 className="text-xl font-bold">Estatísticas Rápidas</h3>
        <div className="flex gap-4">
          {statsMock.map((data, index) => (
            <StatsCard
              key={index}
              value={data.value}
              text={data.text}
              color={data.color}
            />
          ))}
        </div>
      </section>
    </>
  );
}