import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyReservationsProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref: string;
}

export function EmptyReservations({
  title,
  message,
  buttonText,
  buttonHref,
}: EmptyReservationsProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-16 text-center flex flex-col items-center justify-center mt-6">
      <div className="text-gray-400 mb-6">
        <Plus size={48} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 max-w-xs mb-6">{message}</p>
      <Link href={buttonHref} passHref>
        <button className="bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-md border-none cursor-pointer transition-opacity duration-200 hover:opacity-90">
          {buttonText}
        </button>
      </Link>
    </div>
  );
}