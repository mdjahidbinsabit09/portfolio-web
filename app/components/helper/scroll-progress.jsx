"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10000] h-[3px]"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(to right, var(--accent-blue), var(--accent-orange), var(--accent-gold))",
          transition: "width 60ms linear",
          boxShadow: "0 0 8px var(--accent-blue)",
        }}
      />
    </div>
  );
}
