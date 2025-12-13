"use client";

import { useEffect, useRef, useState } from "react";
import BioQuest25 from "./bq2525";
import dynamic from "next/dynamic";

const ScrollReveal = dynamic(
  () => import("./ScrollReveal"),
  { ssr: false }
);

// 🔹 what to show on small screens
function SmallScreenComponent() {
  return (
    <div className="py-12 text-center text-gray-400">
      BioQuest is already visible (small screen)
    </div>
  );
}

// 🔹 what to show on large screens
function LargeScreenComponent() {
  return (
    <div className="py-12 text-center text-gray-400">
      BioQuest is NOT visible (large screen)
    </div>
  );
}

export default function BioQuestLayoutGate() {
  const bioquestRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<"unknown" | "small" | "large">("unknown");

  useEffect(() => {
    if (!bioquestRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 🔑 DECISION MADE ON FIRST OBSERVATION
        setLayout(entry.isIntersecting ? "small" : "large");
        observer.disconnect(); // ✅ lock forever
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(bioquestRef.current);

    return () => observer.disconnect();
  }, []);

  if (layout === "unknown") {
    // avoid flicker
    return null;
  }

  return (
    <>
      {/* Conditional render based on layout */}
      {layout === "small" && <SmallScreenComponent />}
      {layout === "large" && <LargeScreenComponent />}

      {/* BioQuest itself (always rendered the same way) */}
      <div ref={bioquestRef}>
        <ScrollReveal animation="slideUp">
          <div className="scroll-mt-1">
            <BioQuest25 />
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
