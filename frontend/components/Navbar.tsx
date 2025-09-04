export default function Navbar() {
  return (
    <header className="w-full flex justify-around items-center p-4 border-b margin-top none">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">📅 Campus Click</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
          👤
        </div>
        <div className="text-sm">
          <p className="font-semibold">Lucas Eduardo Heliry da Silva Inada</p>
          <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
            Aluno
          </span>
        </div>
      </div>
    </header>
  );
}
