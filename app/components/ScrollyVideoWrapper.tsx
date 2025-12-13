"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollyVideoWrapper({
  videoComponent,
  nextComponent,
}: {
  videoComponent: React.ReactNode;
  nextComponent: React.ReactNode;
}) {
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const z = useTransform(scrollYProgress, [0, 0.7], [300, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <>
      {/* VISUAL ENTRY POINT (no scroll yet) */}
      <div className="relative h-screen overflow-hidden">
        {videoComponent}
      </div>

      {/* SCROLL TRACK (only for animation) */}
      <section
        ref={trackRef}
        className="relative h-[150vh]"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{
                z,
                scale,
                opacity,
                transformStyle: "preserve-3d",
              }}
              className="relative z-20"
            >
              {nextComponent}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
