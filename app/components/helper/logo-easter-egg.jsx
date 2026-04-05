"use client";
import { useState } from "react";

const LOGO_CLICKS_REQUIRED = 7;

export default function LogoEasterEgg({ children }) {
  const [clicks, setClicks] = useState(0);
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= LOGO_CLICKS_REQUIRED) {
      setClicks(0);
      triggerBurst();
    }
  };

  const triggerBurst = () => {
    setBurst(true);
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const particles = Array.from({ length: 120 }, () => ({
      x: window.innerWidth / 2,
      y: 60,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.3) * -16,
      size: Math.random() * 8 + 3,
      color: [
        "#00d4ff",
        "#ff6b35",
        "#ffd700",
        "#ff0099",
        "#00ff88",
      ][Math.floor(Math.random() * 5)],
      life: 1,
      decay: Math.random() * 0.015 + 0.008,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.life -= p.decay;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (alive) requestAnimationFrame(draw);
      else { canvas.remove(); setBurst(false); }
    };
    draw();
  };

  return (
    <span
      onClick={handleClick}
      style={{ cursor: burst ? "default" : "pointer", userSelect: "none" }}
      title={clicks > 0 ? `${LOGO_CLICKS_REQUIRED - clicks} more...` : ""}
    >
      {children}
    </span>
  );
}
