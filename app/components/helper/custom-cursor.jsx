"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot: instant snap
  const dotX = useSpring(mouseX, { stiffness: 5000, damping: 80, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 5000, damping: 80, mass: 0.05 });

  // Ring: very close follow, minimal trail
  const ringX = useSpring(mouseX, { stiffness: 1400, damping: 60, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 1400, damping: 60, mass: 0.1 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select";

    const handleEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "10px";
        cursorRef.current.style.height = "10px";
        cursorRef.current.style.backgroundColor = "var(--accent-orange)";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.borderColor = "var(--accent-orange)";
        ringRef.current.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "6px";
        cursorRef.current.style.height = "6px";
        cursorRef.current.style.backgroundColor = "var(--accent-blue)";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "var(--accent-blue)";
        ringRef.current.style.opacity = "0.6";
      }
    };

    // Event delegation — one listener on document instead of N listeners on every element
    const onOver = (e) => { if (e.target.closest(INTERACTIVE)) handleEnter(); };
    const onOut  = (e) => { if (e.target.closest(INTERACTIVE)) handleLeave(); };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.body.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-[width,height,background-color] duration-150"
        style={{
          width: 6,
          height: 6,
          backgroundColor: "var(--accent-blue)",
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-[width,height,border-color,opacity] duration-200"
        style={{
          width: 32,
          height: 32,
          border: "2px solid var(--accent-blue)",
          opacity: 0.6,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
