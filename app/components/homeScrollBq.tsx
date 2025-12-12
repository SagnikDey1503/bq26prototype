"use client";

import { useEffect, useRef } from "react";

interface ScrollLockUntilProps {
  threshold?: number;         // pixels of attempted scroll required to unlock
  onUnlock?: () => void;      // optional callback when unlocking
  startAfter?: number;        // activate the lock only after window.scrollY >= startAfter
}

export default function ScrollLockUntil({
  threshold = 200,
  onUnlock,
  startAfter = 0,
}: ScrollLockUntilProps) {
  const accRef = useRef<number>(0);
  const lockedRef = useRef<boolean>(false);
  const handlersRef = useRef<{
    onWheel: (e: WheelEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
  } | null>(null);
  const waitScrollRemoverRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    accRef.current = 0;
    lockedRef.current = false;

    if (typeof window === "undefined") return cleanup;

    if (window.scrollY >= startAfter) {
      // Start immediately if already past startAfter
      startLock();
    } else {
      // Wait until user scrolls past startAfter, then start lock
      const onWaitScroll = () => {
        if (window.scrollY >= startAfter) {
          window.removeEventListener("scroll", onWaitScroll, { passive: true });
          waitScrollRemoverRef.current = null;
          startLock();
        }
      };
      waitScrollRemoverRef.current = () =>
        window.removeEventListener("scroll", onWaitScroll);
      window.addEventListener("scroll", onWaitScroll, { passive: true });
    }

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAfter, threshold, onUnlock]);

  const startLock = () => {
    if (lockedRef.current) return;
    accRef.current = 0;
    lockedRef.current = true;

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      accRef.current += Math.abs(e.deltaY || 0);
      if (accRef.current >= threshold) unlock();
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      touchStartY = e.touches?.[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current || touchStartY == null) return;
      e.preventDefault();
      const currentY = e.touches?.[0]?.clientY ?? 0;
      accRef.current += Math.abs(currentY - touchStartY);
      touchStartY = currentY;
      if (accRef.current >= threshold) unlock();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
        accRef.current += e.key === " " ? 100 : 40;
        if (accRef.current >= threshold) unlock();
      }
    };

    handlersRef.current = { onWheel, onTouchStart, onTouchMove, onKeyDown };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
  };

  const stopLock = () => {
    const h = handlersRef.current;
    if (!h) return;
    window.removeEventListener("wheel", h.onWheel);
    window.removeEventListener("touchstart", h.onTouchStart);
    window.removeEventListener("touchmove", h.onTouchMove);
    window.removeEventListener("keydown", h.onKeyDown);
    handlersRef.current = null;
    lockedRef.current = false;
  };

  const unlock = () => {
    if (!lockedRef.current) return;
    stopLock();
    try {
      onUnlock?.();
    } catch (err) {
      // don't crash app for callback errors
      // eslint-disable-next-line no-console
      console.error("onUnlock error:", err);
    }
  };

  function cleanup() {
    if (waitScrollRemoverRef.current) {
      try {
        waitScrollRemoverRef.current();
      } catch {}
      waitScrollRemoverRef.current = null;
    }
    stopLock();
  }

  return null;
}
