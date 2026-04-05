"use client";
import { useState } from "react";
import BlogCard from "./blog-card";
import { FiSearch, FiX } from "react-icons/fi";

export default function BlogList({ blogs }) {
  const [query, setQuery] = useState("");

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(query.toLowerCase()) ||
      b.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center mb-8">
        <div
          className="flex items-center gap-3 rounded-full px-4 py-3 w-full max-w-md"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--border-color)",
            backdropFilter: "blur(12px)",
          }}
        >
          <FiSearch size={16} style={{ color: "var(--text-secondary)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--text-primary)" }}
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <FiX size={16} style={{ color: "var(--text-secondary)" }} />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
          No articles matching &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {filtered.slice(0, 6).map(
            (blog, i) => blog?.cover_image && <BlogCard blog={blog} key={i} />
          )}
        </div>
      )}
    </>
  );
}
