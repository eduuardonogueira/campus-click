export default function Stats() {
  const stats = [
    { value: 6, label: "Total de Salas", color: "bg-gray-300" },
    { value: 3, label: "Disponíveis Agora", color: "bg-green-200" },
    { value: 2, label: "Reservadas no Momento", color: "bg-yellow-200" },
  ];

  return (
    <section className="mt-12 w-full max-w-4xl text-center">
      <h2 className="text-lg font-bold mb-6">Estatísticas Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`${s.color} rounded-xl p-6 text-center shadow`}
          >
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-gray-700">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
