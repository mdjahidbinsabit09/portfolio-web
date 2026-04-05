"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./helper/theme-toggle";
import AvailabilityBadge from "./helper/availability-badge";
import LogoEasterEgg from "./helper/logo-easter-egg";

const SECTIONS = ["about", "services", "experience", "skills", "projects", "education", "contact"];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const navLinks = [
    { href: "/#about", label: "ABOUT", id: "about" },
    { href: "/#services", label: "SERVICES", id: "services" },
    { href: "/#experience", label: "EXPERIENCE", id: "experience" },
    { href: "/#skills", label: "SKILLS", id: "skills" },
    { href: "/#projects", label: "PROJECTS", id: "projects" },
    { href: "/#education", label: "EDUCATION", id: "education" },
    { href: "/blog", label: "BLOGS", id: "blogs" },
  ];

  const openCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
  };

  return (
    <nav className="glass-card sticky top-4 z-50 mb-8 px-4 py-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoEasterEgg>
            <Link
              href="/"
              className="text-2xl lg:text-3xl font-bold"
              style={{ color: "var(--accent-blue)" }}
            >
              JB Sabit
            </Link>
          </LogoEasterEgg>
          <div className="hidden sm:block">
            <AvailabilityBadge />
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                className="block px-3 py-2 no-underline outline-none hover:no-underline rounded-lg transition-all duration-200"
                href={link.href}
                style={isActive ? {
                  background: "rgba(0, 212, 255, 0.08)",
                  borderBottom: "2px solid var(--accent-blue)",
                } : {}}
              >
                <div
                  className="text-xs lg:text-sm transition-colors duration-300"
                  style={{ color: isActive ? "var(--accent-blue)" : "var(--text-primary)" }}
                >
                  {link.label}
                </div>
              </Link>
            );
          })}

          {/* Ctrl+K hint */}
          <button
            onClick={openCommandPalette}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105 ml-1"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
            title="Open command palette"
          >
            <kbd style={{ fontSize: "10px" }}>Ctrl</kbd>
            <span style={{ fontSize: "10px" }}>+</span>
            <kbd style={{ fontSize: "10px" }}>K</kbd>
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="block px-3 py-2 rounded-lg no-underline transition-colors"
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={activeSection === link.id ? { color: "var(--accent-blue)" } : {}}
              >
                <div className="text-sm" style={{ color: activeSection === link.id ? "var(--accent-blue)" : "var(--text-primary)" }}>
                  {link.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border-color)" }}>
            <AvailabilityBadge />
            <button
              onClick={() => { openCommandPalette(); setIsOpen(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              <kbd style={{ fontSize: "10px" }}>Search</kbd>
              <span style={{ fontSize: "10px", opacity: 0.6 }}>/ Ctrl+K</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
