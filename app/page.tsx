import BioQuest25 from "./components/bq2525";
import DNAHero from "./components/DNAHero";

import Illustration from "./components/illustration";
import Navbar from "./components/navbar";
import GlassRegisterCardNextImage from "./components/registration26button";
import ScrollReveal from './components/ScrollReveal';
import ScrollyVideoWrapper from "./components/ScrollyVideoWrapper";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen text-white">
      
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <DNAHero /> 
 <Illustration />
 <GlassRegisterCardNextImage />
     
   
      {/* <div className="py-3" />  */}
      
    
      
      {/* 5. The Archive Reveal (BioQuest25) */}
      <ScrollReveal animation="slideUp">
        <div id="bioquest25" className="scroll-mt-1">
  <BioQuest25 />
</div>

      </ScrollReveal>

    </main>
  );
}