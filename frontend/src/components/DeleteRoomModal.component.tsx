export function DeleteRoomModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[550px] p-6">
        <h2 className="text-xl font-bold mb-2">Excluir Sala</h2>
        <p className="text-sm text-gray-600">Tem certeza que deseja excluir?</p>
        <p className="mb-4 text-sm text-gray-600">
          Esta ação não pode ser desfeita e cancelará todas as reservas
          associadas.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-1 border border-gray-400 bg-white rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-1 bg-red-600 text-white rounded hover:bg-black"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}