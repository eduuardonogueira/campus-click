interface DeleteReservationModalProps {
  isOpen: boolean;
  reservationTitle?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteReservationModal({
  isOpen,
  reservationTitle,
  onClose,
  onConfirm,
}: DeleteReservationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[500px] p-6">
        <h2 className="text-xl font-bold mb-2">Cancelar Reserva</h2>
        <p className="text-gray-600 text-sm">
          Tem certeza que deseja cancelar sua reserva?
        </p>
        <p className="mb-4 text-gray-600 text-sm">
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-1 border border-gray-400 bg-white rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-1 bg-red-600 text-white rounded hover:bg-black cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
