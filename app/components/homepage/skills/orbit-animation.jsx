"use client";
import { motion } from "framer-motion";
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function OrbitAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ height: 460, width: 460 }} className="relative mx-auto hidden lg:flex" />;

  const ring1 = skillsData.slice(0, 6);
  const ring2 = skillsData.slice(6, 13);
  const ring3 = skillsData.slice(13);

  const renderRing = (skills, radius, duration, reverse = false) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {skills.map((skill, i) => {
        const angle = (360 / skills.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = parseFloat((Math.cos(rad) * radius).toFixed(4));
        const y = parseFloat((Math.sin(rad) * radius).toFixed(4));
        return (
          <motion.div
            key={skill}
            className="absolute glass-card p-2 rounded-xl"
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
            }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            title={skill}
          >
            <Image
              src={skillsImage(skill)?.src}
              alt={skill}
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <div className="relative mx-auto hidden lg:flex items-center justify-center" style={{ height: 460, width: 460 }}>
      <div className="absolute z-10 glass-card rounded-full p-3">
        <Image src="/profile.jpg" alt="MD Jahid Bin Sabit" width={72} height={72} className="rounded-full" />
      </div>
      <div className="absolute rounded-full border border-dashed" style={{ borderColor: 'var(--border-color)', width: 180, height: 180 }} />
      <div className="absolute rounded-full border border-dashed" style={{ borderColor: 'var(--border-color)', width: 310, height: 310 }} />
      <div className="absolute rounded-full border border-dashed" style={{ borderColor: 'var(--border-color)', width: 430, height: 430 }} />
      {renderRing(ring1, 90, 20)}
      {renderRing(ring2, 155, 30, true)}
      {renderRing(ring3, 215, 40)}
    </div>
  );
}
