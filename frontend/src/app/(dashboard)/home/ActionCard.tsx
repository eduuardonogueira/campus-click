import Link from "next/link";
import { IconType } from "react-icons";
interface IActionCardProps {
  title: string;
  icon: IconType;
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
  const Icon = icon
  return (
    <section className="bg-gray-100 p-4 rounded-md flex flex-col gap-1 w-[300px]">
      <div className="flex gap-2 items-center">
        <Icon />
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-gray-800">{text}</p>
      <Link href={link} className="px-6 py-2 bg-black text-white rounded-xl mt-3 text-center">{buttonText}</Link>
    </section>
  );
}

