"use client";
import { useTheme } from "./theme-provider";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full glass-card hover:scale-110 transition-transform duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun size={18} style={{ color: 'var(--accent-gold)' }} />
      ) : (
        <FiMoon size={18} style={{ color: 'var(--accent-blue)' }} />
      )}
    </button>
  );
}
