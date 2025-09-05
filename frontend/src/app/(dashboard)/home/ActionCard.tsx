import Link from "next/link";
import { ReactNode } from "react";

interface IActionCardProps {
  title: string;
  icon: ReactNode;
  text: string;
  buttonText: string;
  link: string;
}

export default async function ActionCard({
  title,
  icon,
  text,
  buttonText,
  link,
}: IActionCardProps) {
  return (
    <section className="bg-gray-100 p-4 rounded-md flex flex-col gap-1 w-[300px]">
      <div className="flex gap-2">
        {icon}
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <p className="text-sm">{text}</p>
      <Link href={link} className="px-6 py-2 bg-black text-white rounded-xl mt-3 text-center">{buttonText}</Link>
    </section>
  );
}

