"use client";

import dynamic from "next/dynamic";
import BioQuest25 from "./bq2525";

// ✅ dynamic import is ALLOWED here
const ScrollReveal = dynamic(
  () => import("./ScrollReveal"),
  { ssr: false }
);

export default function ArchiveRevealClient() {
  return (
    <ScrollReveal animation="slideUp">
      <div className="scroll-mt-1">
        <BioQuest25 />
      </div>
    </ScrollReveal>
  );
}
