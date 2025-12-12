"use client";

import { useRef } from "react";
// We don't strictly need useScroll/useTransform if we aren't animating 
// specific fading/moving elements inside, but I'll keep the structure 
// in case you want to add a fade effect later.
import { useScroll } from "framer-motion"; 

interface ScrollyWrapperProps {
  stickyComponent: React.ReactNode; // The component that stays pinned (BioQuest25)
  overlayComponent: React.ReactNode; // The component that scrolls over (GlassRegisterCard)
}

export default function ScrollyWrapper({ stickyComponent, overlayComponent }: ScrollyWrapperProps) {
  const containerRef = useRef(null);

  // We keep this hook just to define the scroll container scope
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="w-full">
      
      {/* 1. THE SCROLL TRACK 
        - Mobile: Auto height (normal stacking)
        - Desktop: 150vh (Creates the 'time' for the stickiness)
      */}
      <section ref={containerRef} className="relative h-auto md:h-[150vh]">
        
        {/* 2. THE STICKY CONTAINER
           - Mobile: Relative (scrolls away)
           - Desktop: Sticky top-0 (pins to screen)
        */}
        <div className="relative h-auto md:sticky md:top-0 md:h-screen flex items-center justify-center overflow-hidden">
          
          <div className="relative w-full h-full">
            {/* This is your BioQuest25 */}
            {stickyComponent}
          </div>

        </div>
      </section>

      {/* 3. THE OVERLAY COMPONENT
        - This naturally waits until the scroll track is finished
        - Then it scrolls up over the sticky component
      */}
      <div className="relative z-10">
        {overlayComponent}
      </div>

    </div>
  );
}