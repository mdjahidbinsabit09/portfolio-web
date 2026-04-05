"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Portfolio",
          text: "Check out this awesome developer portfolio!",
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard!", {
          position: "bottom-right",
          autoClose: 2500,
        });
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Failed to copy link.", { position: "bottom-right" });
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "9999px",
        padding: "0.5rem 1rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.875rem",
        color: "var(--text-primary)",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-blue)";
        e.currentTarget.style.color = "var(--accent-blue)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--glass-border)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      aria-label={copied ? "Link copied" : "Share this page"}
    >
      <FiShare2 size={15} />
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
