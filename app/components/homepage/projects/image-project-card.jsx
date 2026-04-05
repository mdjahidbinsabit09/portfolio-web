"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FaExternalLinkAlt, FaExpand, FaCode } from "react-icons/fa";
import ProjectModal from "./project-modal";

export default function ImageProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <>
      <div
        ref={cardRef}
        className="glass-card neon-border-spin rounded-xl overflow-hidden group cursor-pointer"
        style={{
          transition: 'transform 0.15s ease',
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/images/projects/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: 'rgba(0,212,255,0.2)', color: 'var(--accent-blue)' }}
              aria-label="Preview project"
            >
              <FaExpand size={16} />
            </button>
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                className="p-3 rounded-full transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(255,107,53,0.2)', color: 'var(--accent-orange)' }}
              >
                <FaExternalLinkAlt size={16} />
              </Link>
            )}
            {project.code && (
              <Link
                href={project.code}
                target="_blank"
                className="p-3 rounded-full transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(255,215,0,0.2)', color: 'var(--accent-gold)' }}
              >
                <FaCode size={16} />
              </Link>
            )}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{project.name}</h3>
          <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.slice(0, 4).map((tool, i) => (
              <span
                key={i}
                className="tooltip-wrapper text-xs px-2 py-1 rounded-full cursor-default"
                style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: 'var(--accent-blue)' }}
              >
                {tool}
                <span className="tooltip-label">Built with {tool}</span>
              </span>
            ))}
            {project.tools.length > 4 && (
              <span
                className="tooltip-wrapper text-xs px-2 py-1 rounded-full cursor-default"
                style={{ backgroundColor: 'rgba(255,107,53,0.1)', color: 'var(--accent-orange)' }}
              >
                +{project.tools.length - 4}
                <span className="tooltip-label">
                  {project.tools.slice(4).join(', ')}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
    </>
  );
}
