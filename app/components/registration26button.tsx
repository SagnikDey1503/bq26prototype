"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GlassRegisterCardNextImage() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bioquestInView, setBioquestInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  /* 0️⃣ Ensure client-side mount */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* 1️⃣ Detect first real scroll */
  useEffect(() => {
    if (!mounted) return;

    const onFirstScroll = () => {
      setHasScrolled(true);
      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, [mounted]);

  /* 2️⃣ Observe Bioquest25 SAFELY */
  useEffect(() => {
    if (!mounted) return;

    const bioquestEl = document.getElementById("bioquest25");

    if (!bioquestEl) {
      setBioquestInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBioquestInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(bioquestEl);
    return () => observer.disconnect();
  }, [mounted]);

  /* 3️⃣ Animation logic */
  useEffect(() => {
    if (!mounted) return;

    const card = cardRef.current;
    if (!card) return;

    if (window.innerWidth < 1000) {
      gsap.set(card, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    if (hasAnimated) {
      gsap.set(card, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    if (!hasScrolled) return;
    if (bioquestInView) return;

    gsap.to(card, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      onComplete: () => setHasAnimated(true),
    });
  }, [mounted, hasScrolled, bioquestInView, hasAnimated]);

  if (!mounted) return null;

  return (
   <div
  className="
    relative flex justify-center

    /* DESKTOP */
    mt-0 pt-0

    /* TABLET */
    max-[1000px]:mt-30
    max-[1000px]:pt-0
 max-[1000px]:-mb-10

    /* MOBILE */
    max-[768px]:-mt-5
     max-[768px]:-mb-15
    max-[768px]:pt-0
  "
>


      <div
        ref={cardRef}
        role="region"
        aria-label="Register card"
        className="
          w-[90%] sm:w-[360px]
          -mt-12 sm:-mt-24
          max-[1000px]:mt-6

          mx-auto
          rounded-2xl

          border border-white/20
          max-[1000px]:border-none

          backdrop-blur-sm
          max-[1000px]:backdrop-blur-0

          bg-black/1
          max-[1000px]:bg-transparent

          shadow-2xl
          max-[1000px]:shadow-none

          px-5 py-4
          mb-15

          text-center
          max-[1000px]:text-left

          flex flex-col
          max-[1000px]:flex-row
          items-center
          justify-center

          gap-2

          opacity-0 translate-y-24 blur-sm
        "
      >
        <p className="text-white/95 text-base sm:text-base">
          <span className="hidden max-[1000px]:inline">
            Join Bioquest 26 →
          </span>
          <span className="max-[1000px]:hidden">
            Register for Bioquest 26
          </span>
        </p>
<Link href="/bioquest26">
        <button
          type="button"
          className="
            inline-block
            px-5 py-2
            rounded-full
            bg-emerald-500
            border border-emerald-500/30
            text-black text-sm sm:text-base font-medium
            shadow-md
            max-[1000px]:shadow-none
            hover:scale-[1.03]
            transition-transform duration-150
            whitespace-nowrap
           max-[1000px]:bg-transparent
            max-[1000px]:text-emerald-500
            max-[1000px]:border-emerald-500
            max-[1000px]:px-3 py-1.5

          "
        >
          REGISTER NOW
        </button>
        </Link>
      </div>
    </div>
  );
}
