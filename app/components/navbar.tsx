'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
  className="navbar sticky left-0 w-full z-[999] flex items-center justify-between px-4 py-2 relative border-t-0 border-b-0 shadow-none"
  style={{ top: 0 }}
>



      {/* FULL-WIDTH BACKDROP — ONLY WHEN DESKTOP OPEN */}
      {isDesktopOpen && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 hidden md:block" />
      )}

      {/* LEFT: Mobile hamburger + Brand */}
      <div className="flex items-center gap-3">

        {/* MOBILE HAMBURGER */}
        <div className="relative md:hidden">
          <button
            aria-label={isMobileOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(p => !p)}
            className="p-2 rounded-xl outline-none bg-transparent border-none"
          >
            <MobileHamburgerIcon open={isMobileOpen} />
          </button>

          {/* MOBILE DROPDOWN */}
          <div
            className={`
              absolute left-0 mt-3 w-52 z-[50]
              transition-all duration-250 origin-top-left
              ${isMobileOpen
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'}
            `}
          >
            <ul className="menu menu-sm p-2 bg-transparent border border-white/20 rounded-2xl shadow-2xl">
              <li><Link href="/">Home</Link></li>

              <li tabIndex={0}>
                <a>Bioquest26</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>

              <li tabIndex={0}>
                <a>Bioquest25</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>

              <li><a>Sponsors</a></li>
            </ul>
          </div>
        </div>

        {/* BRAND — collapsible on desktop */}
        <h1
          className={`
            text-xl hidden md:block select-none
            transition-all duration-300 origin-left
            ${isDesktopOpen
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-3 pointer-events-none'}
          `}
        >
          BioQuest
        </h1>
      </div>

      {/* DESKTOP MENU — collapsible */}
      <nav
        className={`
          hidden md:flex md:items-center md:gap-8
          transition-all duration-300 origin-center
          ${isDesktopOpen
            ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-x-2 pointer-events-none'}
        `}
      >
        <Link href="/" className="hover:opacity-70">Home</Link>
        <Link href="/bioquest26" className="hover:opacity-70">Bioquest26</Link>
        <Link href="/bioquest25" className="hover:opacity-70">Bioquest25</Link>
        <Link href="#" className="hover:opacity-70">Sponsors</Link>
      </nav>

      {/* RIGHT — DNA CONTROL (UNCHANGED) */}
     <button
  aria-label={isDesktopOpen ? "Collapse menu" : "Expand menu"}
  aria-expanded={isDesktopOpen}
  onClick={() => setIsDesktopOpen(p => !p)}
  className="hidden md:flex flex-col items-center justify-center bg-transparent border-none outline-none relative"
>
  <DNAToggle open={isDesktopOpen} />

  {!isDesktopOpen && (
  <span
  className="absolute top-full mt-1 text-[10px] text-cyan-300/70 select-none"
  style={{
    animation: "clickme-idle 1.6s ease-in-out infinite",
  }}
>
  click me
</span>

)}

</button>

    </div>
  );
}

/* -------------------------
   MOBILE HAMBURGER (unchanged)
-------------------------- */
function MobileHamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative w-6 h-6 inline-block">
      <span className={`absolute left-0 top-1/2 w-6 h-[2px] bg-current transition duration-300 ${open ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`absolute left-0 top-1/2 w-6 h-[2px] bg-current transition duration-200 ${open ? 'opacity-0 scale-0' : ''}`} />
      <span className={`absolute left-0 top-1/2 w-6 h-[2px] bg-current transition duration-300 ${open ? '-rotate-45' : 'translate-y-2'}`} />
    </span>
  );
}

/* -------------------------
   DNA TOGGLE — ORIGINAL (RESTORED)
-------------------------- */
function DNAToggle({ open }: { open: boolean }) {
  const SIZE = 42;

  return (
    <>
      <style>{`
        @keyframes dna-particle {
          0% { transform: translateY(0) scale(1); opacity: .8; }
          50% { transform: translateY(-4px) scale(1.3); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: .8; }
        }
          @keyframes dna-idle-pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(0.92); }
  100% { transform: scale(1); }
}
@keyframes clickme-idle {
  0%   { transform: scale(1); }
  50%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}


        .dna-wrapper {
          transition: transform 600ms cubic-bezier(.16,.84,.44,1),
                      filter 300ms ease;
          filter: drop-shadow(0 0 4px #00eaffc5) drop-shadow(0 0 8px #00eaff5e);
        }

        .dna-open .dna-wrapper {
          transform: rotate(22deg) scale(1.1);
        }


        .dna-p {
          animation: dna-particle 2s ease-in-out infinite;
        }
        .dna-p.p2 { animation-delay: .3s }
        .dna-p.p3 { animation-delay: .6s }
      `}</style>

      <div className={`${open ? "dna-open" : ""} dna-hover w-${SIZE} h-${SIZE} flex items-center justify-center`}>
        <div className="relative">
          <div className="dna-p absolute w-1 h-1 bg-[#29f3ff] rounded-full" style={{ top: "-6px", left: "2px" }} />
          <div className="dna-p p2 absolute w-1 h-1 bg-[#3fffff] rounded-full" style={{ bottom: "0", right: "4px" }} />
          <div className="dna-p p3 absolute w-1 h-1 bg-[#ff4f7d] rounded-full" style={{ top: "12px", right: "-2px" }} />

          <svg className="dna-wrapper" width={SIZE} height={SIZE * 0.8} viewBox="0 0 40 32" fill="none">
            <path d="M6 2 C12 10, 12 22, 6 30" stroke="#00Eaff" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M34 2 C28 10, 28 22, 34 30" stroke="#3FFFFF" strokeWidth="2.3" strokeLinecap="round" />
            <rect x="11" y="7" width="18" height="2.4" rx="1.2" fill="#29F3FF" />
            <rect x="11" y="14" width="18" height="2.4" rx="1.2" fill="#FFFFFF" />
            <rect x="11" y="21" width="18" height="2.4" rx="1.2" fill="#00EAFF" />
          </svg>
        </div>
      </div>
    </>
  );
}
