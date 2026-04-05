"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = [
  { label: "Home", icon: "⌂", section: "home" },
  { label: "About Me", icon: "◉", section: "about" },
  { label: "Skills", icon: "◈", section: "skills" },
  { label: "Projects", icon: "◰", section: "projects" },
  { label: "Experience", icon: "◆", section: "experience" },
  { label: "Services", icon: "◇", section: "services" },
  { label: "Education", icon: "◍", section: "education" },
  { label: "Contact", icon: "◎", section: "contact" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
      if (open) {
        if (e.key === "ArrowDown")
          setSelected((s) => Math.min(s + 1, filtered.length - 1));
        if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
        if (e.key === "Enter" && filtered[selected]) {
          go(filtered[selected].section);
        }
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, filtered, selected]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const go = (section) => {
    setOpen(false);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-[18vh] px-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid var(--accent-blue)", borderOpacity: 0.3 }}
            initial={{ scale: 0.92, y: -24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: -24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 p-4 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <span style={{ color: "var(--accent-blue)" }} className="text-lg">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search sections..."
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd
                className="text-xs px-2 py-1 rounded"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-jetbrains-mono)",
                }}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.section}
                  onClick={() => go(cmd.section)}
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 mb-1 transition-all duration-150"
                  style={{
                    color: i === selected ? "#000" : "var(--text-primary)",
                    background:
                      i === selected
                        ? "linear-gradient(to right, var(--accent-blue), var(--accent-orange))"
                        : "transparent",
                  }}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span className="text-base w-5">{cmd.icon}</span>
                  <span className="text-sm font-medium">{cmd.label}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p
                  className="text-center py-8 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  No sections found.
                </p>
              )}
            </div>

            <div
              className="px-4 py-3 border-t flex gap-6 text-xs"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              <span>↑↓ Navigate</span>
              <span>↵ Go</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
