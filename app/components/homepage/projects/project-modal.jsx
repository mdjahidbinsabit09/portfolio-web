"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTimes, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Image
            src={project.image || "/images/projects/placeholder.svg"}
            alt={project.name}
            width={1200}
            height={800}
            className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{project.name}</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--accent-blue)' }}>{project.role}</p>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full glass-card"
                style={{ color: 'var(--text-primary)' }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-black font-medium text-sm hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))' }}
              >
                <FaExternalLinkAlt size={14} /> Live Demo
              </Link>
            )}
            {project.code && (
              <Link
                href={project.code}
                target="_blank"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-card text-sm transition-colors hover:opacity-80"
                style={{ color: 'var(--accent-blue)' }}
              >
                <FaCode size={14} /> Source Code
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
