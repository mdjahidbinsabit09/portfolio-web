"use client";
import { useEffect, useState } from 'react';
import PageHeader from './components/PageHeader';
import StatsCard from './components/StatsCard';
import Link from 'next/link';
import {
  FiFolder, FiCode, FiBriefcase, FiBookOpen,
  FiBarChart2, FiMessageSquare, FiServer, FiUser
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    projects: 0, skills: 0, experience: 0, education: 0,
    stats: 0, testimonials: 0, services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const endpoints = ['projects', 'skills', 'experience', 'education', 'stats', 'testimonials', 'services'];
        const results = await Promise.all(
          endpoints.map(e => fetch(`/api/admin/${e}`).then(r => r.json()))
        );
        const obj = {};
        endpoints.forEach((e, i) => { obj[e] = Array.isArray(results[i]) ? results[i].length : 0; });
        setCounts(obj);
      } catch (err) {
        console.error('Failed to load counts', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: 'Projects', value: counts.projects, icon: FiFolder, color: 'var(--accent-blue)', href: '/admin/projects' },
    { label: 'Skills', value: counts.skills, icon: FiCode, color: 'var(--accent-orange)', href: '/admin/skills' },
    { label: 'Experience', value: counts.experience, icon: FiBriefcase, color: 'var(--accent-gold)', href: '/admin/experience' },
    { label: 'Education', value: counts.education, icon: FiBookOpen, color: '#a855f7', href: '/admin/education' },
    { label: 'Stats', value: counts.stats, icon: FiBarChart2, color: '#22c55e', href: '/admin/stats' },
    { label: 'Testimonials', value: counts.testimonials, icon: FiMessageSquare, color: '#ec4899', href: '/admin/testimonials' },
    { label: 'Services', value: counts.services, icon: FiServer, color: '#f59e0b', href: '/admin/services' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your portfolio content" />

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="glass-card shimmer" style={{ height: '88px', borderRadius: '0.75rem' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {cards.map(card => (
            <Link key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
              <StatsCard label={card.label} value={card.value} icon={card.icon} color={card.color} />
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            { label: 'Edit Personal Info', href: '/admin/personal', icon: FiUser },
            { label: 'Add New Project', href: '/admin/projects/new', icon: FiFolder },
            { label: 'Design Settings', href: '/admin/design', icon: FiCode },
          ].map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1rem', borderRadius: '0.5rem',
                textDecoration: 'none', color: 'var(--accent-blue)',
                fontSize: '0.85rem', fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              <action.icon size={16} /> {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
