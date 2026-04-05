"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiLogOut, FiExternalLink } from 'react-icons/fi';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    toast.success('Logged out');
    router.push('/admin/login');
  };

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '0.75rem', padding: '0.75rem 1.5rem',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      {/* Left: title — pl-12 on mobile to clear the fixed hamburger button */}
      <div className="pl-12 lg:pl-0">
        <span style={{
          fontWeight: 700, fontSize: '1rem', letterSpacing: '0.01em',
          background: 'linear-gradient(to right, var(--accent-blue), var(--accent-gold))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Portfolio Admin
        </span>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <a
          href="/" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            color: 'var(--text-secondary)', fontSize: '0.8rem',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-blue)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <FiExternalLink size={14} /> View Site
        </a>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'none', border: '1px solid var(--border-color)',
            borderRadius: '0.4rem', padding: '0.4rem 0.8rem',
            color: 'var(--text-secondary)', fontSize: '0.8rem',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
}
