"use client";

import { useState, useEffect } from "react";
import { MdPalette } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = [
  { name: "Blue",   value: "#00d4ff" },
  { name: "Green",  value: "#00ff9d" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink",   value: "#ff6b9d" },
];

const STORAGE_KEY = "accent_theme";

export default function ColorThemeSwitcher() {
  const [isOpen, setIsOpen]   = useState(false);
  const [active, setActive]   = useState(THEMES[0].value);

  /* Restore persisted theme on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setActive(saved);
        document.documentElement.style.setProperty("--accent-blue", saved);
      }
    } catch (_) {
      /* localStorage unavailable in some environments */
    }
  }, []);

  const applyTheme = (color) => {
    setActive(color);
    document.documentElement.style.setProperty("--accent-blue", color);
    try {
      localStorage.setItem(STORAGE_KEY, color);
    } catch (_) {}
  };

  return (
    <div
      style={{
        position:   "fixed",
        bottom:     "5rem",
        left:       "1.5rem",
        zIndex:     60,
        display:    "flex",
        alignItems: "center",
        gap:        "0.5rem",
      }}
    >
      {/* ── Expandable colour swatches ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="swatches"
            initial={{ opacity: 0, x: -12, scale: 0.88 }}
            animate={{ opacity: 1, x: 0,   scale: 1    }}
            exit={{    opacity: 0, x: -12, scale: 0.88 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              display:      "flex",
              gap:          "0.45rem",
              alignItems:   "center",
              background:   "var(--glass-bg)",
              border:       "1px solid var(--glass-border)",
              borderRadius: "9999px",
              padding:      "0.45rem 0.7rem",
              backdropFilter: "blur(12px)",
            }}
          >
            {THEMES.map((theme) => {
              const isActive = active === theme.value;
              return (
                <button
                  key={theme.value}
                  type="button"
                  title={`${theme.name} theme`}
                  onClick={() => applyTheme(theme.value)}
                  style={{
                    width:      24,
                    height:     24,
                    borderRadius: "50%",
                    background: theme.value,
                    border:     isActive
                      ? "2.5px solid #fff"
                      : "2.5px solid transparent",
                    cursor:     "pointer",
                    padding:    0,
                    outline:    "none",
                    transition: "transform 0.15s, border-color 0.15s",
                    transform:  isActive ? "scale(1.15)" : "scale(1)",
                    flexShrink: 0,
                    /* Subtle ring shadow for active state */
                    boxShadow:  isActive
                      ? `0 0 0 3px ${theme.value}55`
                      : "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = isActive ? "scale(1.15)" : "scale(1)")
                  }
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close theme switcher" : "Open theme switcher"}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{   scale: 0.95 }}
        style={{
          width:           40,
          height:          40,
          borderRadius:    "50%",
          background:      "var(--glass-bg)",
          border:          "1px solid var(--glass-border)",
          color:           "var(--accent-blue)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          "pointer",
          fontSize:        "1.2rem",
          flexShrink:      0,
          backdropFilter:  "blur(12px)",
          transition:      "border-color 0.2s",
        }}
      >
        <MdPalette aria-hidden="true" />
      </motion.button>
    </div>
  );
}
