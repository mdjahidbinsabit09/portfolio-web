"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

/**
 * ProjectListCard – horizontal list-view project card.
 *
 * Expected shape of `project`:
 * {
 *   title:       string
 *   description: string
 *   image:       string   (URL or path)
 *   tools:       string[]
 *   category:    string
 *   liveUrl:     string
 *   githubUrl:   string
 * }
 */
export default function ProjectListCard({ project = {} }) {
  const {
    name: title = "Untitled Project",
    description = "",
    image,
    tools       = [],
    category,
    demo: liveUrl,
    code: githubUrl,
  } = project;

  return (
    <motion.article
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        display:      "flex",
        gap:          "1rem",
        alignItems:   "center",
        background:   "var(--glass-bg)",
        border:       "1px solid var(--glass-border)",
        borderRadius: "0.75rem",
        padding:      "1rem",
      }}
    >
      {/* ── Thumbnail ── */}
      {image ? (
        <div
          style={{
            position:     "relative",
            flexShrink:   0,
            width:        80,
            height:       80,
            borderRadius: "0.5rem",
            overflow:     "hidden",
            background:   "var(--bg-primary)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="80px"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        /* Fallback placeholder when no image is provided */
        <div
          aria-hidden="true"
          style={{
            flexShrink:      0,
            width:           80,
            height:          80,
            borderRadius:    "0.5rem",
            background:      "var(--bg-primary)",
            border:          "1px solid var(--border-color)",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            color:           "var(--text-secondary)",
            fontSize:        "1.5rem",
          }}
        >
          🖼
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title + category badge */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "0.45rem",
            flexWrap:   "wrap",
            marginBottom: "0.2rem",
          }}
        >
          <h3
            style={{
              margin:     0,
              fontSize:   "0.95rem",
              fontWeight: 600,
              color:      "var(--text-primary)",
              whiteSpace: "nowrap",
              overflow:   "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h3>

          {category && (
            <span
              style={{
                flexShrink:   0,
                fontSize:     "0.7rem",
                padding:      "0.15rem 0.55rem",
                borderRadius: "9999px",
                background:   "rgba(0, 212, 255, 0.12)",
                color:        "var(--accent-blue)",
                border:       "1px solid rgba(0, 212, 255, 0.3)",
                lineHeight:   1.4,
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Description – single line */}
        {description && (
          <p
            style={{
              margin:        "0 0 0.5rem 0",
              fontSize:      "0.8rem",
              color:         "var(--text-secondary)",
              lineHeight:    1.5,
              overflow:      "hidden",
              display:       "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        )}

        {/* Tool tags – first 3 */}
        {tools.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                style={{
                  fontSize:     "0.7rem",
                  padding:      "0.1rem 0.45rem",
                  borderRadius: "0.3rem",
                  background:   "var(--glass-bg)",
                  border:       "1px solid var(--border-color)",
                  color:        "var(--text-secondary)",
                  lineHeight:   1.5,
                }}
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span
                style={{
                  fontSize:  "0.7rem",
                  color:     "var(--text-secondary)",
                  lineHeight: 1.5,
                  padding:   "0.1rem 0",
                }}
              >
                +{tools.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Links ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${title}`}
            style={{
              color:      "var(--accent-blue)",
              fontSize:   "1.05rem",
              display:    "flex",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <FiExternalLink aria-hidden="true" />
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository for ${title}`}
            style={{
              color:      "var(--text-secondary)",
              fontSize:   "1.05rem",
              display:    "flex",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <FiGithub aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
