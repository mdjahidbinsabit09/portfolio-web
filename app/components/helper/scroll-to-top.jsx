"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-6 z-50 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
      style={{ width: 52, height: 52 }}
      aria-label="Back to top"
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={52}
        height={52}
        viewBox="0 0 52 52"
      >
        <circle cx={26} cy={26} r={RADIUS} fill="none" stroke="var(--glass-bg)" strokeWidth={3} />
        <circle
          cx={26}
          cy={26}
          r={RADIUS}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 80ms linear" }}
        />
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-orange)" />
            <stop offset="100%" stopColor="var(--accent-gold)" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full"
        style={{
          background: "linear-gradient(to right, var(--accent-orange), var(--accent-gold))",
          color: "#0a0a0a",
        }}
      >
        <FaArrowUp size={14} />
      </span>
    </button>
  );
};

export default ScrollToTop;
