import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "delete";
  onConfirm: (data: { day: string; start: string; end: string }) => void;
  defaultDay?: string;
  defaultStart?: string;
  defaultEnd?: string;
};

export default function AvailabilityModal({
  isOpen,
  onClose,
  mode,
  onConfirm,
  defaultDay = "Segunda-feira",
  defaultStart = "08:00",
  defaultEnd = "08:00",
}: Props) {
  const [day, setDay] = useState(defaultDay);
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  useEffect(() => {
    if (mode === "add") {
      setDay("Segunda-feira");
      setStart("08:00");
      setEnd("08:00");
    } else {
      setDay(defaultDay);
      setStart(defaultStart);
      setEnd(defaultEnd);
    }
  }, [mode, defaultDay, defaultStart, defaultEnd]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        {mode === "delete" ? (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar Exclusão</h2>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja excluir essa disponibilidade?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-sm text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => onConfirm({ day, start, end })}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm"
              >
                Excluir
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {mode === "add" ? "Adicionar Disponibilidade" : "Editar Disponibilidade"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">Atualize a disponibilidade da sala.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Dia da Semana:</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  {[
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado",
                    "Domingo",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">Horário de Início:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaRegClock />
                    </span>
                    <input
                      type="time"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-1">Horário de Fim:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaRegClock />
                    </span>
                    <input
                      type="time"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded-md text-sm text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => onConfirm({ day, start, end })}
                  className="px-4 py-2 bg-black text-white rounded-md text-sm"
                >
                  {mode === "add" ? "Criar" : "Atualizar"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
