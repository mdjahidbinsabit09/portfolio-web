"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { personalData } from "@/utils/data/personal-data";

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, type: "spring", stiffness: 300, damping: 20 },
  }),
  exit: (i) => ({
    opacity: 0,
    y: 10,
    scale: 0.8,
    transition: { delay: i * 0.04 },
  }),
};

export default function QuickFloatContact() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <MdEmail size={20} />,
      label: "Email",
      href: `mailto:${personalData?.email || ""}`,
      color: "var(--accent-blue)",
    },
    {
      icon: <FiGithub size={18} />,
      label: "GitHub",
      href: personalData?.github || "https://github.com",
      color: "var(--text-primary)",
    },
    {
      icon: <FiLinkedin size={18} />,
      label: "LinkedIn",
      href: personalData?.linkedIn || "https://linkedin.com",
      color: "#0a66c2",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 60,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "0.65rem",
      }}
    >
      {/* Main FAB */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle contact options"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent-orange), var(--accent-gold))",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(255,107,53,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,107,53,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,107,53,0.35)";
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MdEmail size={24} />
        </motion.div>
      </button>

      {/* Expandable action buttons */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.label !== "Email" ? "_blank" : undefined}
              rel={action.label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={action.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: action.color,
                textDecoration: "none",
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            >
              {action.icon}
            </motion.a>
          ))}
      </AnimatePresence>
    </div>
  );
}
