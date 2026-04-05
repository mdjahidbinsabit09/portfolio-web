"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Bonjour", lang: "French" },
  { word: "Hola", lang: "Spanish" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "مرحبا", lang: "Arabic" },
  { word: "Ciao", lang: "Italian" },
  { word: "Olá", lang: "Portuguese" },
  { word: "안녕하세요", lang: "Korean" },
];

export default function HelloLanguages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            display: "inline-block",
            color: "var(--accent-blue)",
          }}
        >
          {GREETINGS[index].word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
