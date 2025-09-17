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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[650px] p-6">
        <h2 className="text-xl font-bold mb-4">Excluir Sala</h2>
        <p className="">Tem certeza que deseja excluir?</p>
        <p className="mb-4">
          Esta ação não pode ser desfeita e cancelará todas as reservas
          associadas.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-black cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
