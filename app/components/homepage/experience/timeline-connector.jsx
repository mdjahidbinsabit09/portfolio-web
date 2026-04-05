"use client";

import { useInView } from "react-intersection-observer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

/**
 * TimelineConnector – an animated dashed SVG line with a travelling dot.
 *
 * Props:
 *   height  {number}  Pixel height of the connector (default: 100)
 */
export default function TimelineConnector({ height = 100 }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  const lineControls = useAnimationControls();
  const dotControls  = useAnimationControls();

  useEffect(() => {
    if (!inView) return;

    // Animate the dashed line drawing from top to bottom
    lineControls.start({
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    });

    // After a short delay, animate the dot travelling down the line
    const t = setTimeout(() => {
      dotControls.start({
        cy:         height,
        opacity:    [1, 1, 0],
        transition: { duration: 1, ease: "easeInOut" },
      });
    }, 200);

    return () => clearTimeout(t);
  }, [inView, height, lineControls, dotControls]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position:  "absolute",
        left:      "50%",
        transform: "translateX(-50%)",
        width:     20,
        height,
        pointerEvents: "none",
      }}
    >
      <svg
        width={20}
        height={height}
        viewBox={`0 0 20 ${height}`}
        fill="none"
        overflow="visible"
      >
        {/* ── Dashed background track (static, subtle) ── */}
        <line
          x1={10}
          y1={0}
          x2={10}
          y2={height}
          stroke="var(--border-color)"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.35}
        />

        {/* ── Animated dashed line (draws in on inView) ── */}
        <motion.path
          d={`M 10 0 L 10 ${height}`}
          stroke="var(--accent-blue)"
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={lineControls}
        />

        {/* ── Travelling dot ── */}
        <motion.circle
          cx={10}
          cy={0}
          r={4}
          fill="var(--accent-blue)"
          initial={{ cy: 0, opacity: 0 }}
          animate={dotControls}
          style={{ filter: "drop-shadow(0 0 4px var(--accent-blue))" }}
        />

        {/* ── Static end-cap dot ── */}
        <motion.circle
          cx={10}
          cy={height}
          r={3}
          fill="var(--accent-blue)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.1 }}
          style={{ transformOrigin: `10px ${height}px` }}
        />
      </svg>
    </div>
  );
}
