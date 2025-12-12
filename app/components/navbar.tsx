'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  return (
    <div className="navbar bg-transparent fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-4 py-2">

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
              ${isMobileOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
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
            ${isDesktopOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'}
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
        <Link href="#" className="hover:opacity-70">Bioquest26</Link>
        <Link href="/#bioquest25" className="hover:opacity-70">Bioquest25</Link>
        <Link href="#" className="hover:opacity-70">Sponsors</Link>
      </nav>

      {/* RIGHT — DNA CONTROL */}
      <button
        aria-label={isDesktopOpen ? "Collapse menu" : "Expand menu"}
        aria-expanded={isDesktopOpen}
        onClick={() => setIsDesktopOpen(p => !p)}
        className="hidden md:flex items-center justify-center w-10 h-10 bg-transparent border-none outline-none"
      >
        <DNAToggle open={isDesktopOpen} />
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
      <span
        className={`
          absolute left-0 top-1/2 w-6 h-[2px] bg-current 
          transform transition duration-300
          ${open ? 'translate-y-0 rotate-45' : '-translate-y-2'}
        `}
        style={{ transformOrigin: "center" }}
      />
      <span
        className={`
          absolute left-0 top-1/2 w-6 h-[2px] bg-current
          transition duration-200
          ${open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `}
        style={{ transformOrigin: "center" }}
      />
      <span
        className={`
          absolute left-0 top-1/2 w-6 h-[2px] bg-current 
          transform transition duration-300
          ${open ? 'translate-y-0 -rotate-45' : 'translate-y-2'}
        `}
        style={{ transformOrigin: "center" }}
      />
    </span>
  );
}

/* -------------------------
   DNA TOGGLE (desktop)
-------------------------- */
function DNAToggle({ open }: { open: boolean }) {
  const SIZE = 48; // ← MAKE BIGGER/SMALLER HERE

  return (
    <>
      <style>{`
        /* Helix sliding */
        @keyframes dna-slide {
          0% { transform: translateY(-2px); }
          50% { transform: translateY(2px); }
          100% { transform: translateY(-2px); }
        }

        /* Rung pulse */
        @keyframes dna-rung {
          0% { transform: scaleX(1); opacity: 1; }
          50% { transform: scaleX(1.25); opacity: .85; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        /* particle floating */
        @keyframes dna-particle {
          0% { transform: translateY(0px) scale(1); opacity: .8; }
          50% { transform: translateY(-4px) scale(1.3); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: .8; }
        }

        .dna-wrapper {
          transition: transform 600ms cubic-bezier(.16,.84,.44,1),
                      filter 300ms ease;
        }

        .dna-open .dna-wrapper {
          transform: rotate(22deg) scale(1.10);
        }

        .dna-closed .dna-wrapper {
          transform: rotate(0deg) scale(1);
        }

        /* Glow */
        .dna-wrapper {
          filter: drop-shadow(0 0 4px #00eaffc5) drop-shadow(0 0 8px #00eaff5e);
        }

        /* Hover boost */
        .dna-hover:hover .dna-wrapper {
          transform: scale(1.15) rotate(10deg);
          filter: drop-shadow(0 0 10px #00eaffb3) drop-shadow(0 0 18px #00eaff83);
        }

        /* 3D tilt */
        .dna-hover:hover {
          transform: perspective(200px) rotateX(8deg) rotateY(-8deg);
        }

        /* floating particles */
        .dna-p {
          animation: dna-particle 2s ease-in-out infinite;
        }
        .dna-p.p2 { animation-delay: .3s }
        .dna-p.p3 { animation-delay: .6s }
      `}
      </style>

      <div
        className={`${
          open ? "dna-open" : "dna-closed"
        } dna-hover w-${SIZE} h-${SIZE} flex items-center justify-center transition-transform duration-500`}
      >
        <div className="relative">

          {/* Floating Particles */}
          <div
            className="dna-p p1 absolute w-1 h-1 rounded-full bg-[#29f3ff]"
            style={{ top: "-6px", left: "2px" }}
          />
          <div
            className="dna-p p2 absolute w-1 h-1 rounded-full bg-[#3fffff]"
            style={{ bottom: "0px", right: "4px" }}
          />
          <div
            className="dna-p p3 absolute w-1 h-1 rounded-full bg-[#ff4f7d]"
            style={{ top: "12px", right: "-2px" }}
          />

          {/* DNA SVG */}
          <svg
            className="dna-wrapper"
            width={SIZE}
            height={SIZE * 0.8}
            viewBox="0 0 40 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Neon left strand */}
            <path
              className="strand"
              d="M6 2 C12 10, 12 22, 6 30"
              stroke="#00Eaff"
              strokeWidth="2.3"
              strokeLinecap="round"
            />

            {/* Neon right strand */}
            <path
              className="strand"
              d="M34 2 C28 10, 28 22, 34 30"
              stroke="#3FFFFF"
              strokeWidth="2.3"
              strokeLinecap="round"
            />

            {/* Rungs */}
            <rect className="rung r1"
              x="11" y="7" width="18" height="2.4" rx="1.2"
              fill="#29F3FF" opacity=".95"
            />

            <rect className="rung r2"
              x="11" y="14" width="18" height="2.4" rx="1.2"
              fill="#FFFFFF" opacity=".9"
            />

            <rect className="rung r3"
              x="11" y="21" width="18" height="2.4" rx="1.2"
              fill="#00EAFF" opacity=".95"
            />

            {/* Pink micro-highlights */}
            <circle cx="10" cy="7" r="1.1" fill="#FF4F7D" opacity=".9" />
            <circle cx="30" cy="22" r="1.1" fill="#FF4F7D" opacity=".9" />
          </svg>
        </div>
      </div>
    </>
  );
}
