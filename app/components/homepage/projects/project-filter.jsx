"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageProjectCard from "./image-project-card";
import ProjectListCard from "./project-list-card";
import ProjectSearch from "./project-search";
import ViewToggle from "./view-toggle";

const CATEGORIES = ["All", "WordPress", "Full Stack"];

export default function ProjectFilter({ projects }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const getCategoryCount = (cat) => {
    if (cat === "All") return projects.length;
    return projects.filter(p => p.category === cat).length;
  };

  const filtered = projects
    .filter(p => active === "All" || p.category === active)
    .filter(p => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tools?.some(t => t.toLowerCase().includes(q))
      );
    });

  return (
    <div>
      {/* Category filter tabs with count badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            style={active === cat ? {
              background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
              color: '#000',
            } : {
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
            }}
          >
            {cat}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-bold"
              style={active === cat ? {
                background: 'rgba(0,0,0,0.2)',
                color: '#000',
              } : {
                background: 'rgba(0,212,255,0.15)',
                color: 'var(--accent-blue)',
              }}
            >
              {getCategoryCount(cat)}
            </span>
          </button>
        ))}
      </div>

      {/* Search bar + view toggle */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1">
          <ProjectSearch value={query} onChange={setQuery} />
        </div>
        <ViewToggle view={viewMode} onToggle={setViewMode} />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
          No projects match your search.
        </div>
      )}

      {/* Project grid or list */}
      <AnimatePresence mode="popLayout">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map(project => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ImageProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map(project => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectListCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
