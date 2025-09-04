import Link from "next/link";

export default function Features() {
  const items = [
    {
      title: "Reserva de Salas",
      desc: "Encontre e reserve salas ou laboratórios",
      btn: "Procurar Salas Disponíveis",
      link: "/reserva/1", 
    },
    {
      title: "Buscar e Filtrar",
      desc: "Encontre salas por capacidade, recursos e disponibilidade",
      btn: "Filtro Avançado",
      link: "/filtros", 
    },
    {
      title: "Painel de Administração",
      desc: "Gerencie salas, usuários e configurações do sistema",
      btn: "Gerenciar Sistema",
      link: "/admin",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gray-50 shadow rounded-xl p-6 text-center flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
          <Link href={item.link}>
            <button className="mt-6 bg-black text-white py-2 rounded hover:opacity-90">
              {item.btn}
            </button>
          </Link>
        </div>
      ))}
    </section>
  );
}
