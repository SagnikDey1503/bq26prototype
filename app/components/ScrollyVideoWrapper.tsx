"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollyVideoWrapperProps {
  videoComponent: React.ReactNode;
  nextComponent: React.ReactNode;
  className?: string;
}

export default function ScrollyVideoWrapper({
  videoComponent,
  nextComponent,
}: ScrollyVideoWrapperProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <div className="w-full">
      {/* SECTION 1: Wrapper */}
      {/* NOTE: md:h-[200vh] creates a long scroll track on desktop for the effect */}
      <section ref={containerRef} className="relative h-auto md:h-[130vh]">
        <div className="relative h-[50vh] md:sticky md:top-0 md:h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {videoComponent}
          </div>
        </div>
      </section>

      {/* SECTION 2: Next Component */}
      <div className="relative z-10 ">{nextComponent}</div>
    </div>
  );
}
