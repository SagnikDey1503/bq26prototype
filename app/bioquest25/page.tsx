'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Youtube, ExternalLink, Users, Trophy, Target, ChevronRight } from 'lucide-react';
import DNAHero from '../components/DNAHero';
import Navbar from '../components/navbar';

// --- 1. Reusable Glass Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-transparent border border-white/10 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  // CHANGED: from-blue-400 to-cyan-300 -> from-emerald-400 to-green-300
  <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 mb-6">
    {children}
  </h2>
);

// --- 2. Main Page Component ---

export default function BioQuest25() {
  const [activeTab, setActiveTab] = useState<'round1' | 'round2' | 'round3'>('round1');

  return (
    // CHANGED: selection:bg-blue-500/30 -> selection:bg-emerald-500/30
    <main className="min-h-screen  text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* <Navbar /> */}
       <DNAHero />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            BioQuest <span className="text-emerald-400">2025</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            The archive of excellence. Explore the journey, the statistics, and the champions of last year's event.
          </p>
        </div>

        {/* GLASS NAVIGATION TABS */}
        <div className="flex justify-center mb-12">
          <GlassCard className="p-2 inline-flex space-x-2">
            {[
              { id: 'round1', label: 'Round 1: Science and Curiosity' },
              { id: 'round2', label: 'Round 2: Intoduction to synthetic biology' },
              { id: 'round3', label: 'Round 3: Mini IGEM challenge' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    // CHANGED: bg-blue-600 -> bg-emerald-600 & shadow-blue-500/25 -> shadow-emerald-500/25
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </GlassCard>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="min-h-[600px] transition-all">
          
          {/* --- ROUND 1 CONTENT --- */}
          {activeTab === 'round1' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CHANGED: text-blue-400 -> text-emerald-400 */}
                <StatCard label="Total Participants" value="1,240" subtext="Aspiring Biologists" icon={<Users className="w-6 h-6 text-emerald-400"/>} />
                <StatCard label="Qualified" value="145" subtext="11.6% Qualification Rate" icon={<Target className="w-6 h-6 text-green-400"/>} />
                <StatCard label="Cut-off Score" value="72/100" subtext="Difficulty: High" icon={<Trophy className="w-6 h-6 text-yellow-400"/>} />
              </div>

              {/* Resources Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8 flex flex-col justify-between">
                  <div>
                    <SectionTitle>Official Resources</SectionTitle>
                    <p className="text-gray-400 mb-6">Access the original question papers and answer keys used in the 2025 screening round.</p>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {/* CHANGED: ActionButton default variant (which used blue) will now use emerald. */}
                    <ActionButton icon={<Download size={18} />} text="Question Paper" />
                    <ActionButton icon={<Download size={18} />} text="Answer Key" />
                  </div>
                </GlassCard>

                <GlassCard className="p-8 flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                   <div>
                    <SectionTitle>Prep Playlist</SectionTitle>
                    <p className="text-gray-400 mb-6">Curated video lectures and breakdowns of the toughest questions from 2025.</p>
                   </div>
                   <ActionButton icon={<Youtube size={18} />} text="Watch on YouTube" variant="danger" />
                </GlassCard>
              </div>
            </div>
          )}

          {/* --- ROUND 2 CONTENT --- */}
          {activeTab === 'round2' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CHANGED: text-blue-400 -> text-emerald-400 */}
                <StatCard label="Round 2 Participants" value="145" subtext="Qualified from R1" icon={<Users className="w-6 h-6 text-emerald-400"/>} />
                <StatCard label="Finalists Selected" value="12" subtext="Top 8% make it" icon={<Target className="w-6 h-6 text-purple-400"/>} />
                <StatCard label="Format" value="Case Study" subtext="Analytical Focus" icon={<Trophy className="w-6 h-6 text-pink-400"/>} />
              </div>

              {/* CHANGED: border-blue-500/30 -> border-emerald-500/30 */}
              <GlassCard className="p-10 text-center border-emerald-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">The Round 2 Challenge</h3>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                  Participants were tasked with solving a real-world genetic engineering crisis. 
                  View the complete case study prompt below to understand the level of depth required.
                </p>
                {/* CHANGED: ActionButton default variant (which used blue) will now use emerald. */}
                <ActionButton icon={<ExternalLink size={18} />} text="View Exam Format & Case Study" />
              </GlassCard>
            </div>
          )}

          {/* --- ROUND 3 CONTENT (FINALS) --- */}
          {activeTab === 'round3' && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Winners Section */}
              <section>
                <SectionTitle>The Finalists</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Mock Team Card 1 - Winner */}
                  <TeamCard 
                    rank="Winner"
                    name="Team Helix"
                    members="Sarah J., Mike T., Alisha K."
                    mentor="Dr. R. Gupta (IISER)"
                    abstract="Exploring CRISPR-Cas9 delivery mechanisms in non-dividing cells using lipid nanoparticles..."
                    image="/team1-placeholder.jpg" // Replace with real image
                  />
                  {/* Mock Team Card 2 - Runner Up */}
                  <TeamCard 
                    rank="Runner Up"
                    name="Team Nucleus"
                    members="John D., Emma W."
                    mentor="Prof. S. Khan"
                    abstract="A novel approach to synthesizing biodegradable polymers using bacterial fermentation..."
                    image="/team2-placeholder.jpg" 
                  />
                </div>
              </section>

              {/* Gallery Section - High Priority Visuals */}
              <section>
                 <SectionTitle>Event Highlights</SectionTitle>
                 
                 {/* Judges Row */}
                 <div className="mb-8">
                    {/* CHANGED: border-blue-500 -> border-emerald-500 */}
                    <h3 className="text-xl font-semibold text-gray-300 mb-4 pl-2 border-l-4 border-emerald-500">The Jury</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                           <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden">
                              {/* Placeholder for Judge Image */}
                              <div className="absolute inset-0 bg-gray-800 animate-pulse group-hover:scale-105 transition-transform duration-500"></div> 
                              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="font-bold text-white">Dr. Name Here</p>
                                {/* CHANGED: text-blue-300 -> text-emerald-300 */}
                                <p className="text-xs text-emerald-300">Senior Scientist, NIH</p>
                              </div>
                           </div>
                        ))}
                    </div>
                 </div>

                 {/* The Walk Row */}
                 <div>
                    {/* CHANGED: border-blue-500 -> border-emerald-500 */}
                    <h3 className="text-xl font-semibold text-gray-300 mb-4 pl-2 border-l-4 border-emerald-500">The Walk & Atmosphere</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
                         <div className="md:col-span-2 relative rounded-xl overflow-hidden border border-white/10 group">
                            {/* Placeholder for 'The Walk' - The most important image */}
                            <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
                                <span className="text-gray-500 font-mono">Image: The Walk</span>
                            </div>
                         </div>
                         <div className="relative rounded-xl overflow-hidden border border-white/10">
                            {/* Placeholder for Lunch/Goodies */}
                            <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
                                <span className="text-gray-500 font-mono">Image: Goodies</span>
                            </div>
                         </div>
                    </div>
                 </div>

              </section>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

// --- 3. Sub-Components for Cleanliness ---

function StatCard({ label, value, subtext, icon }: any) {
  return (
    <GlassCard className="p-6 relative overflow-hidden group hover:backdrop-blur-sm  transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 font-medium">{label}</h3>
        <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      {/* CHANGED: text-blue-300/80 -> text-emerald-300/80 */}
      <div className="text-sm text-emerald-300/80">{subtext}</div>
    </GlassCard>
  );
}

function ActionButton({ icon, text, variant = "primary" }: any) {
    const styles = variant === 'danger' 
      ? 'bg-red-500/20 hover:bg-red-500/40 text-red-300 border-red-500/30' 
      // CHANGED: bg-blue-600/hover:bg-blue-500 -> bg-emerald-600/hover:bg-emerald-500 & shadow-blue-900/20 -> shadow-emerald-900/20
      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-900/20';

    return (
      <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border ${styles}`}>
        {icon}
        <span>{text}</span>
      </button>
    );
}

function TeamCard({ name, members, abstract, mentor, rank, image }: any) {
    return (
        <GlassCard className="p-0 overflow-hidden flex flex-col md:flex-row group">
            <div className="w-full md:w-2/5 relative min-h-[200px] md:min-h-full">
                 {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gray-700"></div>
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                    {rank}
                </div>
            </div>
            <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
                    {/* CHANGED: text-blue-400 -> text-emerald-400 */}
                    <p className="text-sm text-emerald-400 mb-4">Mentor: {mentor}</p>
                    <p className="text-gray-400 text-sm italic mb-4">"{abstract}"</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Members</p>
                    <p className="text-gray-300 text-sm">{members}</p>
                </div>
            </div>
        </GlassCard>
    )
}