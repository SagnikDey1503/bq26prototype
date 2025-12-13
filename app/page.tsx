import Navbar from "./components/navbar";
import DNAHero from "./components/DNAHero";
import Illustration from "./components/illustration";
import GlassRegisterCardNextImage from "./components/registration26button";
import ArchiveRevealClient from "./components/ArchiveRevealClient";
import BioQuestLayoutGate from "./components/BioquestLayoutGate";
import BioQuestArchiveGate from "./components/BioquestArchiveGate";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen text-white">
      <Navbar />

      <DNAHero />
      <Illustration />
      <GlassRegisterCardNextImage />

      {/* ✅ Client-only section */}
     <ArchiveRevealClient />
    </main>
  );
}
