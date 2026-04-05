"use client";

import { useEffect } from "react";

export default function MouseTrail() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const MAX_DOTS = 8;
    const dots = [];

    for (let i = 0; i < MAX_DOTS; i++) {
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        background: var(--accent-blue);
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.1s ease;
      `;
      document.body.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0, age: 0 });
    }

    const positions = [];
    let animFrameId = null;

    const onMouseMove = (e) => {
      positions.unshift({ x: e.clientX, y: e.clientY });
      if (positions.length > MAX_DOTS) positions.length = MAX_DOTS;
    };

    const animate = () => {
      positions.forEach((pos, i) => {
        const dot = dots[i];
        if (!dot) return;
        dot.el.style.left = pos.x + "px";
        dot.el.style.top = pos.y + "px";
        const opacity = 0.6 * (1 - i / MAX_DOTS);
        dot.el.style.opacity = opacity.toString();
        const scale = 1 - i * 0.08;
        dot.el.style.transform = `translate(-50%, -50%) scale(${Math.max(scale, 0.2)})`;
      });

      for (let i = positions.length; i < MAX_DOTS; i++) {
        dots[i].el.style.opacity = "0";
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      dots.forEach((dot) => {
        if (dot.el && dot.el.parentNode) {
          dot.el.parentNode.removeChild(dot.el);
        }
      });
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return null;
}
