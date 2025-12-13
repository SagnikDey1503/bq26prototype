'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  FlaskConical, 
  BrainCircuit, 
  Globe, 
  AlertCircle,
  Clock,
  ChevronDown,
  // Added missing imports below
  Eye,
  EyeOff,
  ImageIcon
} from 'lucide-react';
import DNAHero from '../components/DNAHero';

// --- 1. Reusable Glass Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-black/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 mb-6 flex items-center gap-3">
    {children}
  </h2>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
    {children}
  </span>
);

const PYQCard = ({ data, index }: { data: any, index: number }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <GlassCard className="p-6 transition-all hover:border-emerald-500/30">
      
      {/* Question Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           <span className="text-emerald-400 font-mono text-sm">Q{index + 1}</span>
           <span className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 text-gray-400 uppercase">
             {data.type}
           </span>
        </div>
        <button 
          onClick={() => setIsRevealed(!isRevealed)}
          className="text-xs flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          {isRevealed ? <><EyeOff size={14} /> Hide Answer</> : <><Eye size={14} /> Reveal Answer</>}
        </button>
      </div>

      {/* Question Text */}
      <h3 className="text-lg font-medium text-gray-200 mb-4 leading-relaxed">
        {data.question}
      </h3>

      {/* Optional Diagram */}
      {data.image && (
        <div className="mb-6 relative w-full h-48 md:h-64 rounded-lg overflow-hidden border border-white/10 bg-black/40">
           <div className="absolute inset-0 flex items-center justify-center text-gray-600">
               <span className="flex items-center gap-2"><ImageIcon size={16}/> Diagram: {data.image}</span>
           </div>
        </div>
      )}

      {/* Render based on Type: MCQ or Text */}
      <div className="space-y-3">
        
        {/* MCQ LOGIC */}
        {data.type === 'MCQ' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.options.map((opt: string, i: number) => {
              // Logic for styling options based on Reveal State
              const isCorrect = i === data.correctIndex;
              let style = "border-white/10 text-gray-400 hover:bg-white/5"; // Default
              
              if (isRevealed) {
                if (isCorrect) style = "border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"; // Correct
                else style = "border-white/5 text-gray-600 opacity-50"; // Dim others
              }

              return (
                <div key={i} className={`p-3 rounded-lg border text-sm transition-all duration-300 ${style}`}>
                  <span className="font-mono opacity-50 mr-2">{String.fromCharCode(65 + i)}</span>
                  {opt}
                  {isRevealed && isCorrect && <CheckCircle className="inline-block w-4 h-4 ml-2 float-right text-emerald-400"/>}
                </div>
              );
            })}
          </div>
        )}

        {/* TEXT LOGIC */}
        {data.type === 'Subjective' && (
          <div className={`overflow-hidden transition-all duration-500 ${isRevealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
              <p className="text-sm text-emerald-100">
                <span className="font-bold text-emerald-400">Answer:</span> {data.answer}
              </p>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

// --- 2. Main Page Component ---

export default function BioQuest26() {
  // Simple state for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- MOCK DATA FOR PYQS ---
  const pyqs = [
    {
      type: 'MCQ',
      question: "In a CRISPR-Cas9 experiment, if the guide RNA (gRNA) has a perfect match with a DNA sequence but lacks a PAM sequence adjacent to it, what will happen?",
      options: [
        "Cas9 will cleave the DNA normally.",
        "Cas9 will bind but not cleave.",
        "Cas9 will not bind to the DNA at all.",
        "The DNA will be degraded by non-specific nucleases."
      ],
      correctIndex: 2, // Option C (Index 0,1,2,3)
      image: null // No image for this one
    },
    {
      type: 'MCQ',
      question: "Identify the phase of mitosis shown in the diagram below where sister chromatids are being pulled apart.",
      image: "/images/mitosis-diagram.png", // Example Path
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      correctIndex: 2
    },
    {
      type: 'Subjective',
      question: "Explain why synthetic biology circuits often fail when transferred from E. coli to Yeast.",
      answer: "Eukaryotic (Yeast) and Prokaryotic (E. coli) systems have different transcription machineries, ribosome binding sites, and compartmentation (nucleus vs cytosol). A promoter optimized for E. coli sigma factors will not be recognized by Yeast RNA Polymerase II.",
      image: null
    }
  ];

  return (
    <main className="min-h-screen  text-gray-100 font-sans selection:bg-emerald-500/30">
      
      {/* Background & Hero */}
      <DNAHero />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-20">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center space-y-6 pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Badge>Registration Open</Badge>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight">
            BioQuest <span className="text-emerald-400 drop-shadow-lg">2026</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The next evolution of biology competition. <br />
            Ignite your curiosity, solve global crises, and shape the future of synthetic biology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
             <Link href="/register" className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
             <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium text-white">
                Download Brochure
             </button>
          </div>
        </div>

        {/* --- SECTION: WHAT TO EXPECT (Grid Layout) --- */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
           <SectionTitle><BrainCircuit className="text-emerald-400" /> What to Expect</SectionTitle>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Round 1 */}
            <GlassCard className="p-8 relative group overflow-hidden">
  
  {/* Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="
        absolute top-0 right-0
        p-20
        bg-emerald-500
        opacity-10
        rounded-full
        blur-2xl
        -mr-10 -mt-10
        transition-all duration-300
        group-hover:opacity-20
      "
    />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6 text-emerald-300 font-bold text-xl">
      1
    </div>

    <h3 className="text-xl font-bold mb-2">The Screening</h3>

    <p className="text-gray-400 text-sm mb-4">
      Format: Online Quiz (MCQ + Short Answer)
    </p>

    <p className="text-gray-300">
      Not your average textbook questions. Expect scenarios that test your{' '}
      <span className="text-white font-semibold">intuition</span> and ability to
      apply logic to biological systems.
    </p>
  </div>

</GlassCard>


              {/* Round 2 */}
              <GlassCard className="p-8 relative group overflow-hidden">

  {/* Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="
        absolute top-0 right-0
        p-20
        bg-blue-500
        opacity-10
        rounded-full
        blur-2xl
        -mr-10 -mt-10
        transition-all duration-300
        group-hover:opacity-20
        will-change-opacity
      "
    />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-300 font-bold text-xl">
      2
    </div>

    <h3 className="text-xl font-bold mb-2">The Case Study</h3>

    <p className="text-gray-400 text-sm mb-4">
      Format: 48-Hour Challenge
    </p>

    <p className="text-gray-300">
      You will be given a theoretical biological crisis (e.g., a new pathogen or climate issue).
      Design a{' '}
      <span className="text-white font-semibold">
        synthetic biology solution
      </span>{' '}
      to solve it.
    </p>
  </div>

</GlassCard>


              {/* Round 3 */}
           <GlassCard className="p-8 relative group overflow-hidden">

  {/* Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="
        absolute top-0 right-0
        p-20
        bg-purple-500
        opacity-10
        rounded-full
        blur-2xl
        -mr-10 -mt-10
        transition-all duration-300
        group-hover:opacity-20
        will-change-opacity
      "
    />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-300 font-bold text-xl">
      3
    </div>

    <h3 className="text-xl font-bold mb-2">The Finals</h3>

    <p className="text-gray-400 text-sm mb-4">
      Format: Live Presentation
    </p>

    <p className="text-gray-300">
      Present your solution to a panel of expert scientists. Defend your hypothesis,
      methodology, and ethics in a{' '}
      <span className="text-white font-semibold">live Q&A</span>.
    </p>
  </div>

</GlassCard>

           </div>
        </section>

        {/* --- SECTION: ELIGIBILITY & RULES (Split Layout) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
           
           {/* Eligibility */}
           <GlassCard className="p-8 border-l-4 border-l-emerald-500">
              <SectionTitle><Globe className="text-emerald-400" /> Eligibility</SectionTitle>
              <ul className="space-y-4">
                 {[
                    "Open to all students currently in Grades 9-12 (or equivalent).",
                    "Participants can be from any country.",
                    "Gap year students are eligible if not yet enrolled in a university.",
                    "Teams must consist of 1 to 3 members."
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                       <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                       <span>{item}</span>
                    </li>
                 ))}
              </ul>
           </GlassCard>

           {/* Rules */}
           <GlassCard className="p-8 border-l-4 border-l-red-400">
              <SectionTitle><AlertCircle className="text-red-400" /> Key Rules</SectionTitle>
              <ul className="space-y-4">
                 {[
                    "All work must be original. Plagiarism leads to instant disqualification.",
                    "Use of AI (ChatGPT, Claude) is allowed for brainstorming but must be cited.",
                    "Late submissions for Round 2 will incur a score penalty.",
                    "Decisions made by the jury panel are final and binding."
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                       <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                       <span>{item}</span>
                    </li>
                 ))}
              </ul>
           </GlassCard>
        </section>

        {/* --- SECTION: KEY DATES (Horizontal Timeline) --- */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <SectionTitle><Clock className="text-emerald-400" /> Timeline</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { date: "Aug 15", event: "Registration Opens", status: "active" },
                  { date: "Sep 20", event: "Round 1 (Online)", status: "future" },
                  { date: "Oct 05", event: "Round 2 Release", status: "future" },
                  { date: "Oct 25", event: "Grand Finale", status: "future" }
                ].map((item, i) => (
                   <GlassCard key={i} className={`p-6 flex flex-col items-center text-center ${item.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/30' : ''}`}>
                      <span className={`text-3xl font-bold mb-2 ${item.status === 'active' ? 'text-emerald-400' : 'text-gray-500'}`}>{item.date}</span>
                      <span className="text-gray-300 font-medium">{item.event}</span>
                      {item.status === 'active' && <span className="mt-2 text-xs text-emerald-400 uppercase tracking-widest animate-pulse">● Live</span>}
                   </GlassCard>
                ))}
            </div>
        </section>

        {/* --- SECTION: PAST YEAR ARCHIVE --- */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <SectionTitle><FlaskConical className="text-emerald-400" /> Past Year Archive</SectionTitle>
                <p className="text-gray-400">Try solving these actual questions from BioQuest 2025.</p>
              </div>
              <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View Full Repository <ArrowRight size={14}/>
              </button>
           </div>
           
           <div className="space-y-6">
              {pyqs.map((q, i) => (
                <PYQCard key={i} data={q} index={i} />
              ))}
           </div>
        </section>

        {/* --- SECTION: FAQ (Accordion) --- */}
        <section className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="text-center mb-10">
               <SectionTitle><HelpCircle className="text-emerald-400" /> Frequently Asked Questions</SectionTitle>
            </div>
            
            <div className="space-y-4">
               {[
                 { q: "Is there a registration fee?", a: "No, BioQuest 2026 is completely free for all participants worldwide." },
                 { q: "Do I need prior biology knowledge?", a: "While helpful, it is not mandatory. Round 1 tests curiosity and logic more than rote memorization." },
                 { q: "Can I participate alone?", a: "Yes, you can participate as a solo entrant or in a team of up to 3 members." },
                 { q: "Where will the finals be held?", a: "The finals will be held virtually over Zoom, allowing global participation." }
               ].map((faq, i) => (
                 <div key={i} className="group">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full text-left p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between transition-all"
                    >
                       <span className="font-medium text-lg text-gray-200">{faq.q}</span>
                       <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                       <div className="p-6 text-gray-400 border-l border-emerald-500/30 ml-4 mt-2">
                          {faq.a}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <div className="text-center py-20">
           <p className="text-gray-400 mb-6">Ready to challenge yourself?</p>
           <Link href="/register" className="inline-block px-12 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:scale-105 transition-transform">
              Join the Quest
           </Link>
        </div>

      </div>
    </main>
  );
}