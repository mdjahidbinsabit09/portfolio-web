"use client";
import { FiPrinter } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105"
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--border-color)",
        color: "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-blue)";
        e.currentTarget.style.color = "var(--accent-blue)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      <FiPrinter size={15} />
      <span>Print</span>
    </button>
  );
}
