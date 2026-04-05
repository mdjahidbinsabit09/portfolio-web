"use client";

import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "0.75rem",
        padding: "1rem",
        backdropFilter: "blur(12px)",
        display: "inline-flex",
        flexDirection: "column",
        gap: "0.35rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Pulsing green dot */}
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
            animation: "livePulse 1.5s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
        <style>{`
          @keyframes livePulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
          }
        `}</style>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--accent-blue)",
            letterSpacing: "0.05em",
            minWidth: "10ch",
          }}
        >
          {time ?? "--:--:-- --"}
        </span>
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          paddingLeft: "1rem",
        }}
      >
        Bangladesh Standard Time (GMT+6)
      </span>
    </div>
  );
}
