import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Features from "@/components/Features";
import Stats from "@/components/Stats";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-6 py-8">
      <Navbar />
      <Welcome />
      <Features />
      <Stats />
    </main>
  );
}
