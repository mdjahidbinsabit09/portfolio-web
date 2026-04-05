"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Odometer – slot-machine style digit counter.
 *
 * Props:
 *   value   {number|string}  Final numeric value to count up to
 *   suffix  {string}         Optional suffix rendered after the digits (e.g. "+", "%")
 */
export default function Odometer({ value = 0, suffix = "" }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  const target        = parseInt(String(value), 10) || 0;
  const [count, setCount]   = useState(0);
  const rafRef              = useRef(null);
  const startTimeRef        = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const DURATION = 1600; // ms

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed  = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target]);

  // Split into individual digit characters (preserve leading layout)
  const digits = String(count).split("");

  const gradientStyle = {
    background: "linear-gradient(135deg, var(--accent-blue), var(--accent-gold))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div
      ref={ref}
      aria-label={`${target}${suffix}`}
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        fontFamily: "var(--font-jetbrains-mono, monospace)",
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {/* ── Digit slots ── */}
      {digits.map((digit, i) => (
        <div
          key={i}
          style={{
            overflow: "hidden",
            height: "1.2em",
            display: "inline-block",
            position: "relative",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}                    // new key triggers animation on digit change
              initial={{ y: "-110%", opacity: 0.4 }}
              animate={{ y: "0%",    opacity: 1   }}
              exit={{    y:  "110%", opacity: 0.4  }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                display: "inline-block",
                lineHeight: "1.2em",
                ...gradientStyle,
              }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}

      {/* ── Optional suffix ── */}
      {suffix && (
        <span
          style={{
            ...gradientStyle,
            marginLeft: "0.05em",
            fontSize: "2rem",
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
