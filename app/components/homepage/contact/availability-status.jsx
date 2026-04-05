"use client";

import { useState, useEffect } from "react";

const PULSE_KEYFRAMES = `
@keyframes availability-pulse {
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
  50%       { opacity: 0.85; transform: scale(1.35); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}
`;

export default function AvailabilityStatus() {
  // Start as null to avoid server/client hydration mismatch
  const [bstDate, setBstDate] = useState(null);

  useEffect(() => {
    const tick = () => {
      // Convert current moment to Bangladesh Standard Time (Asia/Dhaka = UTC+6)
      const bst = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
      );
      setBstDate(bst);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (date) => {
    if (!date) return "--:--:--";
    return date.toLocaleTimeString("en-US", {
      hour:   "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getDayOfWeek = (date) => {
    if (!date) return "———";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <>
      <style>{PULSE_KEYFRAMES}</style>

      <div
        style={{
          background:   "var(--glass-bg)",
          border:       "1px solid var(--glass-border)",
          borderRadius: "1rem",
          padding:      "1.25rem",
        }}
      >
        {/* ── Available indicator ── */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "0.6rem",
            marginBottom: "0.85rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width:        10,
              height:       10,
              borderRadius: "50%",
              background:   "#22c55e",
              display:      "inline-block",
              flexShrink:   0,
              animation:    "availability-pulse 1.8s ease-in-out infinite",
            }}
          />
          <span
            style={{
              color:      "var(--text-primary)",
              fontWeight: 600,
              fontSize:   "0.95rem",
            }}
          >
            Available for Freelance Work
          </span>
        </div>

        {/* ── Response time ── */}
        <p
          style={{
            color:        "var(--text-secondary)",
            fontSize:     "0.875rem",
            margin:       "0 0 0.45rem 0",
            lineHeight:   1.5,
          }}
        >
          ⚡ Usually responds within 24 hours
        </p>

        {/* ── Timezone note ── */}
        <p
          style={{
            color:        "var(--text-secondary)",
            fontSize:     "0.875rem",
            margin:       "0 0 1rem 0",
            lineHeight:   1.5,
          }}
        >
          🕐 Bangladesh Standard Time (GMT+6)
        </p>

        {/* ── Live clock ── */}
        <div
          style={{
            background:    "rgba(0, 0, 0, 0.25)",
            borderRadius:  "0.6rem",
            padding:       "0.55rem 0.9rem",
            fontFamily:    "var(--font-jetbrains-mono, monospace)",
            display:       "flex",
            justifyContent: "space-between",
            alignItems:    "center",
            gap:           "0.75rem",
          }}
        >
          <span
            style={{
              fontSize:   "0.8rem",
              color:      "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            {getDayOfWeek(bstDate)}
          </span>
          <span
            style={{
              fontSize:    "1rem",
              color:       "var(--accent-blue)",
              fontWeight:  600,
              letterSpacing: "0.04em",
            }}
          >
            {formatTime(bstDate)}
          </span>
        </div>
      </div>
    </>
  );
}
