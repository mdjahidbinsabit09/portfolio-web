"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const SKILLS = [
  { label: "WordPress",   value: 92 },
  { label: "PHP",         value: 85 },
  { label: "JavaScript",  value: 82 },
  { label: "React/Next.js", value: 78 },
  { label: "MySQL",       value: 80 },
  { label: "UI/UX",       value: 75 },
];

const MAX_RADIUS = 90;
const CENTER     = 140;
const LEVELS     = 5;

/** Returns a space-separated "x,y x,y …" string for a regular hexagon */
function hexPoints(radius, cx = CENTER, cy = CENTER) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
  }).join(" ");
}

/** Returns the data polygon points scaled to each skill's value */
function skillPoints() {
  return SKILLS.map((skill, i) => {
    const angle  = (Math.PI / 3) * i - Math.PI / 2;
    const radius = (skill.value / 100) * MAX_RADIUS;
    return `${CENTER + radius * Math.cos(angle)},${CENTER + radius * Math.sin(angle)}`;
  }).join(" ");
}

export default function RadarChart() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 280 280"
        style={{ maxWidth: "280px" }}
        aria-label="Skills radar chart"
      >

        {/* ── Background grid hexagons ── */}
        {Array.from({ length: LEVELS }, (_, i) => (
          <polygon
            key={i}
            points={hexPoints((MAX_RADIUS / LEVELS) * (i + 1))}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth={1}
            opacity={0.45}
          />
        ))}

        {/* ── Axis spokes ── */}
        {SKILLS.map((_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={CENTER + MAX_RADIUS * Math.cos(angle)}
              y2={CENTER + MAX_RADIUS * Math.sin(angle)}
              stroke="var(--border-color)"
              strokeWidth={1}
              opacity={0.35}
            />
          );
        })}

        {/* ── Skill data polygon (animates on inView) ── */}
        <motion.polygon
          points={skillPoints()}
          fill="var(--accent-blue)"
          fillOpacity={0.3}
          stroke="var(--accent-blue)"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* ── Vertex labels ── */}
        {SKILLS.map((skill, i) => {
          const angle       = (Math.PI / 3) * i - Math.PI / 2;
          const labelRadius = MAX_RADIUS + 24;
          return (
            <text
              key={i}
              x={CENTER + labelRadius * Math.cos(angle)}
              y={CENTER + labelRadius * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              fill="var(--text-secondary)"
              fontFamily="var(--font-jetbrains-mono)"
            >
              {skill.label}
            </text>
          );
        })}

        {/* ── Percentage labels at each vertex on the data polygon ── */}
        {SKILLS.map((skill, i) => {
          const angle  = (Math.PI / 3) * i - Math.PI / 2;
          const radius = (skill.value / 100) * MAX_RADIUS;
          return (
            <motion.text
              key={i}
              x={CENTER + (radius + 8) * Math.cos(angle)}
              y={CENTER + (radius + 8) * Math.sin(angle)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={8}
              fill="var(--accent-blue)"
              fontFamily="var(--font-jetbrains-mono)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {skill.value}%
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}
