import CardData from "@/components/CardData";
import Navbar from "@/components/Navbar";

export default function ReservaPage() {

  return (
    <main className="">
      <Navbar></Navbar>
      <section className="px-20">
      <h1 className="text-3xl font-bold mb-2 mt-4">Salas</h1>
      <p className=" mb-6">Faça a reserva da sua sala</p>
      <CardData></CardData>
    

      </section>
    </main>
  );
}
