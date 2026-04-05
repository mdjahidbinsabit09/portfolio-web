"use client";

import { FiSearch, FiX } from "react-icons/fi";

/**
 * ProjectSearch – a rounded glass search bar.
 *
 * Props:
 *   value       {string}    Controlled input value
 *   onChange    {function}  Called with the new string value
 *   placeholder {string}    Input placeholder text
 */
export default function ProjectSearch({
  value       = "",
  onChange,
  placeholder = "Search projects...",
}) {
  return (
    <div
      role="search"
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "0.5rem",
        background:   "var(--glass-bg)",
        border:       "1px solid var(--glass-border)",
        borderRadius: "9999px",
        padding:      "0.65rem 1rem",
        width:        "100%",
        transition:   "border-color 0.2s",
      }}
      /* Highlight border on focus-within */
      onFocus={(e) =>
        (e.currentTarget.style.borderColor = "var(--accent-blue)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = "var(--glass-border)")
      }
    >
      {/* Search icon */}
      <FiSearch
        aria-hidden="true"
        style={{
          color:     "var(--text-secondary)",
          flexShrink: 0,
          fontSize:  "1rem",
        }}
      />

      {/* Text input */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Search projects"
        style={{
          background:  "transparent",
          outline:     "none",
          border:      "none",
          flex:        1,
          color:       "var(--text-primary)",
          fontSize:    "0.875rem",
          fontFamily:  "inherit",
          minWidth:    0,
          /* Remove the native 'x' button in WebKit */
          WebkitAppearance: "none",
        }}
      />

      {/* Clear button – only shown when there's a value */}
      {value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
          style={{
            background:  "none",
            border:      "none",
            cursor:      "pointer",
            color:       "var(--text-secondary)",
            display:     "flex",
            alignItems:  "center",
            padding:     0,
            flexShrink:  0,
            transition:  "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <FiX style={{ fontSize: "1rem" }} />
        </button>
      )}
    </div>
  );
}
