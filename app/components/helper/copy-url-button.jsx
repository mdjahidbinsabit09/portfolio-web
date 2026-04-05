"use client";

import { useState } from "react";
import { FiLink2, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";

/**
 * CopyUrlButton – copies the current page URL to the clipboard.
 * Shows a success state (FiCheck + "Copied!") for 2 s after a successful copy.
 */
export default function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return; // prevent double-trigger during cooldown

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Portfolio URL copied!", {
        position:        "bottom-right",
        autoClose:       2500,
        hideProgressBar: false,
        pauseOnHover:    true,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL – please try manually.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "URL copied" : "Copy portfolio URL"}
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "0.45rem",
        padding:      "0.45rem 0.85rem",
        background:   "var(--glass-bg)",
        border:       "1px solid var(--glass-border)",
        borderRadius: "9999px",
        cursor:       copied ? "default" : "pointer",
        color:        copied ? "#22c55e" : "var(--text-secondary)",
        fontSize:     "0.875rem",
        fontFamily:   "inherit",
        transition:   "color 0.25s, border-color 0.25s",
        whiteSpace:   "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        if (!copied) e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      {copied ? (
        <FiCheck aria-hidden="true" style={{ fontSize: "0.9rem", flexShrink: 0 }} />
      ) : (
        <FiLink2 aria-hidden="true" style={{ fontSize: "0.9rem", flexShrink: 0 }} />
      )}
      <span>{copied ? "Copied!" : "Copy URL"}</span>
    </button>
  );
}
