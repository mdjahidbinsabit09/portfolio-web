"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789";

export default function ScrambleText({ text, as: Tag = "span", className, style }) {
  const [displayed, setDisplayed] = useState(text);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    let frame = 0;
    const totalFrames = text.length * 3;

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < frame / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
      if (frame > totalFrames) clearInterval(interval);
    }, 28);

    return () => clearInterval(interval);
  }, [inView, text]);

  return (
    <Tag ref={ref} className={className} style={{ fontFamily: "var(--font-jetbrains-mono)", ...style }}>
      {displayed}
    </Tag>
  );
}
