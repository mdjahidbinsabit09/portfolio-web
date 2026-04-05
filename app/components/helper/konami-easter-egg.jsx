"use client";
import { useEffect, useRef, useState } from "react";

export default function KonamiEasterEgg() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const konamiRef = useRef([]);
  const KONAMI = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "b","a",
  ];

  useEffect(() => {
    const onKey = (e) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        setActive(true);
        setTimeout(() => setActive(false), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const CHARS =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF";

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00d4ff";
      ctx.font = "14px monospace";

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[99998] flex items-center justify-center"
      onClick={() => setActive(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="relative z-10 text-center p-8 rounded-2xl"
        style={{
          background: "rgba(0,0,0,0.8)",
          border: "1px solid var(--accent-blue)",
          color: "var(--accent-blue)",
          fontFamily: "var(--font-jetbrains-mono)",
        }}
      >
        <p className="text-2xl font-bold mb-2">☠ CHEAT CODE ACTIVATED ☠</p>
        <p className="text-sm" style={{ color: "var(--accent-gold)" }}>
          You found the Konami Code Easter Egg!
        </p>
        <p className="text-xs mt-3" style={{ color: "var(--text-secondary)" }}>
          Click anywhere to exit
        </p>
      </div>
    </div>
  );
}
