"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome, FiUser, FiFolder, FiCode, FiBriefcase, FiBookOpen,
  FiBarChart2, FiMessageSquare, FiServer, FiDroplet, FiSettings,
  FiMenu, FiX
} from 'react-icons/fi';

const links = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/personal', label: 'Personal Info', icon: FiUser },
  { href: '/admin/projects', label: 'Projects', icon: FiFolder },
  { href: '/admin/skills', label: 'Skills', icon: FiCode },
  { href: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { href: '/admin/education', label: 'Education', icon: FiBookOpen },
  { href: '/admin/stats', label: 'Stats', icon: FiBarChart2 },
  { href: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { href: '/admin/services', label: 'Services', icon: FiServer },
  { href: '/admin/design', label: 'Design', icon: FiDroplet },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const nav = (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem' }}>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: collapsed ? '0.65rem' : '0.65rem 0.9rem',
            borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem',
            fontWeight: isActive(href) ? 600 : 400,
            color: isActive(href) ? 'var(--accent-blue)' : 'var(--text-secondary)',
            background: isActive(href) ? 'rgba(0,212,255,0.08)' : 'transparent',
            borderLeft: isActive(href) ? '3px solid var(--accent-blue)' : '3px solid transparent',
            transition: 'all 0.2s',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          title={collapsed ? label : undefined}
        >
          <Icon size={18} />
          {!collapsed && <span>{label}</span>}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center justify-center"
        style={{
          position: 'fixed', top: '1rem', left: '1rem', zIndex: 1001,
          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
          borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer',
          color: 'var(--text-primary)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex"
        style={{
          width: collapsed ? '4.5rem' : '16rem',
          flexShrink: 0, flexDirection: 'column',
          background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <div style={{
          padding: collapsed ? '1rem 0.5rem' : '1rem 1rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
        }}>
          {!collapsed && (
            <span style={{
              fontWeight: 700, fontSize: '1.1rem',
              background: 'linear-gradient(to right, var(--accent-blue), var(--accent-gold))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Admin
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)', padding: '0.25rem',
            }}
          >
            <FiMenu size={18} />
          </button>
        </div>
        {nav}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className="lg:hidden flex flex-col"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: '16rem',
          background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)',
          zIndex: 1000,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={{
          padding: '1rem', borderBottom: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontWeight: 700, fontSize: '1.1rem',
            background: 'linear-gradient(to right, var(--accent-blue), var(--accent-gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Admin
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <FiX size={20} />
          </button>
        </div>
        {nav}
      </aside>
    </>
  );
}
