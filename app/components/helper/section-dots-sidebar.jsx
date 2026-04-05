"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SectionDotsSidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredDot, setHoveredDot] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current.observe(el);
        observers.push(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observers.forEach((el) => observerRef.current.unobserve(el));
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="hidden lg:flex"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div
            key={id}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setHoveredDot(id)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {hoveredDot === id && (
              <div
                style={{
                  position: "absolute",
                  right: "calc(100% + 10px)",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                {label}
              </div>
            )}
            <button
              onClick={() => scrollToSection(id)}
              aria-label={`Scroll to ${label}`}
              style={{
                width: isActive ? "12px" : "6px",
                height: isActive ? "12px" : "6px",
                borderRadius: "50%",
                background: isActive ? "var(--accent-blue)" : "transparent",
                border: isActive
                  ? "none"
                  : "1px solid var(--accent-blue)",
                opacity: isActive ? 1 : 0.4,
                cursor: "pointer",
                padding: 0,
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: isActive
                  ? "0 0 8px var(--accent-blue), 0 0 16px var(--accent-blue)"
                  : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
