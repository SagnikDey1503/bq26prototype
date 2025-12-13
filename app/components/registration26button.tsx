"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlassRegisterCardNextImage() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 1️⃣ Reduced motion → no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(card, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    // 2️⃣ Mobile / Tablet → visible, no animation
    if (window.innerWidth < 768) {
      gsap.set(card, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    // 3️⃣ Desktop → animate on scroll
    const ctx = gsap.context(() => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex items-start justify-center">
      <div
        ref={cardRef}
        role="region"
        aria-label="Register card"
        className="
          w-[90%] sm:w-[360px]
          -mt-12 sm:-mt-24
          mx-auto
          rounded-2xl
          border border-white/20
          backdrop-blur-md
          bg-clip-padding
          shadow-2xl
          text-center
          px-5 py-4
          mb-15

          /* INITIAL STATE — PREVENTS FLASH */
          opacity-0 translate-y-24 blur-sm
        "
      >
        <p className="text-white/95 mb-4 text-sm sm:text-base">
          Register now for Bioquest 26
        </p>

        <button
          type="button"
          className="
            inline-block
            px-5 py-2
            rounded-full
            bg-emerald-500
            backdrop-blur-md
            border border-emerald-500/30
            text-black text-sm sm:text-base font-medium
            shadow-md
            hover:scale-[1.03]
            transition-transform duration-150
          "
        >
          REGISTER NOW
        </button>
      </div>
    </div>
  );
}
