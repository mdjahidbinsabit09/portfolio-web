"use client";

import { useState, useEffect, useCallback } from "react";

const SHORTCUTS = [
  { keys: ["Ctrl", "K"], description: "Command palette" },
  { keys: ["Ctrl", "Shift", "T"], description: "Theme toggle" },
  { keys: ["?"], description: "Keyboard guide" },
  { keys: ["↑↑↓↓←→←→BA"], description: "Easter egg (Konami Code)" },
  { keys: ["Esc"], description: "Close modal" },
];

export default function KeyboardGuide() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Fixed trigger button bottom-left — desktop only */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open keyboard shortcuts guide"
        className="hidden lg:flex"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 60,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          color: "var(--text-secondary)",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--accent-blue)";
          e.currentTarget.style.borderColor = "var(--accent-blue)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.borderColor = "var(--glass-border)";
        }}
      >
        ?
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "1rem",
              backdropFilter: "blur(16px)",
              padding: "1.75rem",
              maxWidth: "28rem",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close keyboard guide"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "1.2rem",
                cursor: "pointer",
                lineHeight: 1,
                padding: "0.2rem",
              }}
            >
              ✕
            </button>

            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              Keyboard Shortcuts
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SHORTCUTS.map((shortcut, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {shortcut.description}
                  </span>
                  <div style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}>
                    {shortcut.keys.map((key, ki) => (
                      <kbd
                        key={ki}
                        style={{
                          background: "var(--glass-bg)",
                          border: "1px solid var(--glass-border)",
                          borderRadius: "5px",
                          padding: "0.2rem 0.5rem",
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-jetbrains-mono)",
                          color: "var(--text-primary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
