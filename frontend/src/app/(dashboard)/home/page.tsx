"use server";

import { useHomeData } from "@/hooks/useHomeData";
import HomeActionCard from "./ActionCard";
import StatsCard from "./StatsCard";
import { statsMock } from "./mock";
import type { ComponentType, ReactNode } from "react";

type ActionCardData = {
  title: string;
  icon: ComponentType<{ className?: string }>; 
  text: string;
  buttonText: string;
  link: string;
};

export default async function HomePage() {
  const { actionCardData } = (await useHomeData()) as {
    actionCardData: ActionCardData[];
  };

  return (
    <main className="flex flex-col items-center gap-10">
      <section className="flex flex-col gap-2 items-center mt-10">
        <h2 className="text-3xl font-bold">Seja Bem vindo ao Campus Click</h2>
        <h3 className="text-md text-gray-800">
          Gerenciamento e reserva de salas e laboratórios de forma simples,
          prática e acessível para toda a comunidade acadêmica.
        </h3>
      </section>

      <section className="flex gap-4">
        {actionCardData.map((data, index) => {
          const Icon = data.icon;
          const iconNode: ReactNode = <Icon />;

          const fixedLink = data.link === "/admin" ? "/salas" : data.link;

          return (
            <HomeActionCard
              key={index}
              title={data.title}
              icon={iconNode}
              text={data.text}
              buttonText={data.buttonText}
              link={fixedLink}
            />
          );
        })}
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
    </main>
  );
}
