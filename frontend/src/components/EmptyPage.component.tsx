import { CalendarX } from "lucide-react";

interface IEmptyPageProps {
  title: string;
  message: string;
}

export function EmptyPage({
  title,
  message,
}: IEmptyPageProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-16 text-center flex flex-col items-center justify-center mt-6">
      <div className="text-gray-400 mb-6">
        <CalendarX size={48} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-x mb-6">{message}</p>
    </div>
  );
}
