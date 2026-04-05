"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import SectionReveal from "../../helper/section-reveal";

const skills = [
  { name: "WordPress / WooCommerce", level: 92 },
  { name: "PHP / Plugin Dev", level: 85 },
  { name: "JavaScript / ES6+", level: 82 },
  { name: "React / Next.js", level: 78 },
  { name: "MySQL / REST API", level: 80 },
  { name: "HTML / CSS / SASS", level: 90 },
];

function SkillBar({ name, level, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {name}
        </span>
        <span
          className="text-sm font-bold"
          style={{
            color: "var(--accent-blue)",
            fontFamily: "var(--font-jetbrains-mono)",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(to right, var(--accent-blue), var(--accent-orange))",
            boxShadow: "0 0 8px var(--accent-blue)",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay || 0 }}
        />
      </div>
    </div>
  );
}

export default function SkillBars() {
  return (
    <SectionReveal>
      <div className="glass-card p-8 rounded-2xl mt-8">
        <h3
          className="text-base font-semibold mb-6 tracking-wider uppercase"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-jetbrains-mono)",
          }}
        >
          // Core Proficiency
        </h3>
        {skills.map((s, i) => (
          <SkillBar key={s.name} {...s} delay={i * 0.1} />
        ))}
      </div>
    </SectionReveal>
  );
}
