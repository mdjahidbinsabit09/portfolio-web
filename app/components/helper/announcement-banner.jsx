"use client";

import { useState, useEffect } from "react";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("banner_dismissed_v1");
      if (!stored) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem("banner_dismissed_v1", "true");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background:
          "linear-gradient(90deg, rgba(0,212,255,0.10) 0%, rgba(255,107,53,0.10) 100%)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0.6rem 3rem 0.6rem 1.5rem",
        fontSize: "0.85rem",
        color: "var(--text-primary)",
        flexWrap: "wrap",
      }}
    >
      <span>
        🚀 Available for new projects — Let&apos;s build something amazing!
      </span>
      <a
        href="#contact"
        onClick={() => setDismissed(false)}
        style={{
          color: "var(--accent-gold)",
          fontWeight: 700,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          whiteSpace: "nowrap",
        }}
      >
        Get in touch →
      </a>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        style={{
          position: "absolute",
          top: "50%",
          right: "0.75rem",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: "0.4rem",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "32px",
          minHeight: "32px",
        }}
      >
        ✕
      </button>
    </div>
  );
}
