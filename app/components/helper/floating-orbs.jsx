"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    width: 600,
    height: 600,
    style: { top: "10%", left: "10%" },
    background: "var(--accent-blue)",
    animate: { x: [0, 30, -20, 0], y: [0, -40, 20, 0] },
    duration: 20,
  },
  {
    width: 500,
    height: 500,
    style: { top: "50%", right: "5%" },
    background: "var(--accent-orange)",
    animate: { x: [0, -25, 15, 0], y: [0, 30, -15, 0] },
    duration: 18,
  },
  {
    width: 400,
    height: 400,
    style: { bottom: "15%", left: "30%" },
    background: "var(--accent-gold)",
    animate: { x: [0, 20, -30, 0], y: [0, -20, 40, 0] },
    duration: 22,
  },
  {
    width: 350,
    height: 350,
    style: { top: "30%", left: "60%" },
    background: "var(--accent-blue)",
    animate: { x: [0, -15, 25, 0], y: [0, 25, -10, 0] },
    duration: 16,
  },
];

export default function FloatingOrbs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            width: orb.width,
            height: orb.height,
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: -1,
            opacity: 0.15,
            background: orb.background,
            ...orb.style,
          }}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
