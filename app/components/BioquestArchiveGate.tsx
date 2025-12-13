"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BioQuest25 from "./bq2525";

// client-only animation wrapper
const ScrollReveal = dynamic(
  () => import("./ScrollReveal"),
  { ssr: false }
);

/* --------- COMPONENTS YOU CAN CUSTOMIZE ---------- */

// shown ONLY on large screens before BioQuest appears
function LargeScreenPlaceholder() {
  return (
    <div className="py-24 text-center text-gray-400">
      Explore the BioQuest Archive ↓
    </div>
  );
}

/* ------------------------------------------------ */

type Layout = "unknown" | "small" | "large";

export default function BioQuestArchiveGate() {
  const bioquestRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<Layout>("unknown");
  const [reveal, setReveal] = useState(false);

  /* 1️⃣ Detect layout ONCE on mount */
  useEffect(() => {
    if (!bioquestRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const detectedLayout = entry.isIntersecting ? "small" : "large";
        setLayout(detectedLayout);

        // small screen → reveal immediately
        if (detectedLayout === "small") {
          setReveal(true);
        }

        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(bioquestRef.current);

    return () => observer.disconnect();
  }, []);

  /* 2️⃣ Large screen: reveal when user scrolls */
  useEffect(() => {
    if (layout !== "large") return;

    const onScroll = () => {
      setReveal(true);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [layout]);

  if (layout === "unknown") {
    // prevent flicker / hydration mismatch
    return null;
  }

  return (
    <>
      {/* Large screen only placeholder */}
      {layout === "large" && !reveal && <LargeScreenPlaceholder />}

      {/* BioQuest section (same DOM always) */}
      <div ref={bioquestRef}>
        {reveal ? (
          <ScrollReveal animation="slideUp">
            <div className="scroll-mt-1">
              <BioQuest25 />
            </div>
          </ScrollReveal>
        ) : (
          // keeps DOM stable before reveal
          <div className="scroll-mt-1 opacity-0">
            <BioQuest25 />
          </div>
        )}
      </div>
    </>
  );
}
