import Link from "next/link";
import type { ReactNode } from "react";

interface HomeActionCardProps {
  title: string;
  icon: ReactNode;
  text: string;
  buttonText: string;
  link: string;
}

export default function HomeActionCard({
  title,
  icon,
  text,
  buttonText,
  link,
}: HomeActionCardProps) {
  const fixedLink = link === "/admin" ? "/salas" : link;

  return (
    <section className="bg-gray-100 p-4 rounded-md flex flex-col gap-1 w-[300px]">
      <div className="flex gap-2 items-center">
        {icon}
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-gray-800">{text}</p>
      <Link
        href={fixedLink}
        className="px-6 py-2 bg-black text-white rounded-xl mt-3 text-center"
      >
        {buttonText}
      </Link>
    </section>
  );
}
