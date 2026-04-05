"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES = {
  Frontend: [
    "React", "Next.js", "TypeScript", "JavaScript",
    "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vue.js",
  ],
  Backend: [
    "Node.js", "Express.js", "PHP", "Python",
    "MySQL", "MongoDB", "REST API", "GraphQL",
  ],
  CMS: ["WordPress", "WooCommerce", "Elementor", "ACF", "CPT UI"],
  Tools: ["Git", "GitHub", "Docker", "VS Code", "Figma", "Postman", "Redux", "Jest"],
};

const TABS = ["All", "Frontend", "Backend", "CMS", "Tools"];

/** Returns true if a skill name belongs to the given category */
function skillBelongsTo(skillName, category) {
  return CATEGORIES[category]?.some(
    (entry) => skillName?.toLowerCase() === entry.toLowerCase()
  );
}

export default function SkillTabs({ skillsData = [], skillsImage }) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredSkills =
    activeTab === "All"
      ? skillsData
      : skillsData.filter((skill) => {
          const name = typeof skill === "string" ? skill : skill?.name ?? "";
          return skillBelongsTo(name, activeTab);
        });

  return (
    <div>
      {/* ── Tab buttons ── */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: "9999px",
                border: isActive ? "none" : "1px solid var(--border-color)",
                background: isActive
                  ? "linear-gradient(135deg, var(--accent-orange), var(--accent-gold))"
                  : "var(--glass-bg)",
                color: isActive ? "#000" : "var(--text-secondary)",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                letterSpacing: "0.01em",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── Filtered skill pills ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
        {filteredSkills.map((skill, i) => {
          const skillName  = typeof skill === "string" ? skill : skill?.name ?? "";
          const skillImage =
            skillsImage && typeof skill === "object" ? skill?.image ?? null : null;

          return (
            <div
              key={`${skillName}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.8rem",
                borderRadius: "0.5rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              {skillImage && (
                <Image
                  src={skillImage}
                  alt={skillName}
                  width={16}
                  height={16}
                  style={{ objectFit: "contain" }}
                />
              )}
              <span>{skillName}</span>
            </div>
          );
        })}

        {filteredSkills.length === 0 && (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No skills found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
