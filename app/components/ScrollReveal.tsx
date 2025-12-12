'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts'; // Optional: or write a custom hook (see below)

// Simple custom hook if you don't want to install 'usehooks-ts'
function useIsDesktop() {
  // Safe check for window existence (Next.js SSR safety)
  if (typeof window === 'undefined') return true; 
  return window.innerWidth >= 768; // 768px is standard Tailwind 'md' breakpoint
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'focus' | 'slideUp' | 'fade'; // We define our 3 styles here
  delay?: number;
}

export default function ScrollReveal({ children, animation = 'slideUp', delay = 0 }: ScrollRevealProps) {
  const isDesktop = useIsDesktop();

  // If mobile, return children without animation wrapper
  if (!isDesktop) {
    return <>{children}</>;
  }

  // Define our animation variants
  const variants = {
    focus: {
      hidden: { opacity: 0, scale: 0.95, filter: 'blur(8px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers when 100px of the element is visible
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: delay }} // "Cinematic" easing
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
}