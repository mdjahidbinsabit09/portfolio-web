"use client";

import { BsGrid, BsList } from "react-icons/bs";

/**
 * ViewToggle – switches between grid and list layouts.
 *
 * Props:
 *   view      {"grid" | "list"}   Currently active view
 *   onToggle  {function}          Called with "grid" or "list"
 */
export default function ViewToggle({ view = "grid", onToggle }) {
  const buttons = [
    { id: "grid", Icon: BsGrid, label: "Grid view"  },
    { id: "list", Icon: BsList, label: "List view"  },
  ];

  return (
    <div
      role="group"
      aria-label="View toggle"
      style={{
        display:      "flex",
        background:   "var(--glass-bg)",
        border:       "1px solid var(--glass-border)",
        borderRadius: "9999px",
        padding:      "0.25rem",
        gap:          "0.2rem",
      }}
    >
      {buttons.map(({ id, Icon, label }) => {
        const isActive = view === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle?.(id)}
            aria-label={label}
            aria-pressed={isActive}
            style={{
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           "2rem",
              height:          "2rem",
              borderRadius:    "9999px",
              border:          "none",
              background:      isActive ? "var(--glass-border)" : "transparent",
              color:           isActive ? "var(--accent-blue)" : "var(--text-secondary)",
              cursor:          "pointer",
              fontSize:        "1.05rem",
              transition:      "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isActive)
                e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              if (!isActive)
                e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Icon aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
