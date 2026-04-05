"use client";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';

const toggleStyle = (checked) => ({
  position: 'relative', width: '44px', height: '24px', borderRadius: '9999px',
  background: checked ? 'var(--accent-blue)' : 'var(--glass-bg)',
  border: `1px solid ${checked ? 'var(--accent-blue)' : 'var(--border-color)'}`,
  cursor: 'pointer', transition: 'all 0.3s', flexShrink: 0,
});

const dotStyle = (checked) => ({
  position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
  width: '18px', height: '18px', borderRadius: '50%',
  background: checked ? '#fff' : 'var(--text-secondary)',
  transition: 'left 0.3s',
});

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

const FEATURES = [
  { key: 'enableParticles', label: 'Hero Particles', desc: 'Canvas particle network in hero section' },
  { key: 'enableCursor', label: 'Custom Cursor', desc: 'Animated dot + ring cursor on desktop' },
  { key: 'enableMouseTrail', label: 'Mouse Trail', desc: 'Fading ghost dots following cursor' },
  { key: 'enableFloatingOrbs', label: 'Floating Orbs', desc: 'Animated background orbs' },
  { key: 'enableScrollProgress', label: 'Scroll Progress Bar', desc: 'Gradient progress bar at top' },
  { key: 'enableAnnouncement', label: 'Announcement Banner', desc: 'Sticky availability banner at top' },
  { key: 'enableSectionDots', label: 'Section Dots', desc: 'Right-side section navigation dots' },
  { key: 'enableCommandPalette', label: 'Command Palette', desc: 'Ctrl+K quick navigation' },
  { key: 'enableKonami', label: 'Konami Easter Egg', desc: 'Matrix rain on ↑↑↓↓←→←→BA' },
];

export default function DesignPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/design')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { toast.error('Failed to load'); setLoading(false); });
  }, []);

  const update = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/design', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success('Design settings saved');
      else toast.error('Failed to save');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="shimmer" style={{ height: '500px', borderRadius: '1rem' }} />;

  return (
    <div>
      <PageHeader
        title="Design Settings"
        description="Customize colors, toggle features on/off"
        action={
          <button onClick={handleSave} disabled={saving} style={{
            padding: '0.55rem 1.5rem', border: 'none', borderRadius: '0.4rem',
            background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
            color: '#000', fontWeight: 600, fontSize: '0.85rem',
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
          }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      {/* Color Theme */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Accent Colors
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { key: 'accentBlue', label: 'Primary (Blue)', default: '#00d4ff' },
            { key: 'accentOrange', label: 'Secondary (Orange)', default: '#ff6b35' },
            { key: 'accentGold', label: 'Tertiary (Gold)', default: '#ffd700' },
          ].map(c => (
            <div key={c.key}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                {c.label}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={data?.[c.key] || c.default}
                  onChange={(e) => update(c.key, e.target.value)}
                  style={{
                    width: '40px', height: '36px', border: '1px solid var(--border-color)',
                    borderRadius: '0.35rem', background: 'none', cursor: 'pointer', padding: '2px',
                  }}
                />
                <input
                  type="text"
                  value={data?.[c.key] || c.default}
                  onChange={(e) => update(c.key, e.target.value)}
                  style={{ ...inputStyle, flex: 1, fontFamily: 'var(--font-jetbrains-mono, monospace)', fontSize: '0.8rem' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
            Preview:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['accentBlue', 'accentOrange', 'accentGold'].map(k => (
              <div key={k} style={{
                width: '60px', height: '30px', borderRadius: '0.35rem',
                background: data?.[k] || '#000',
              }} />
            ))}
            <div style={{
              flex: 1, height: '30px', borderRadius: '0.35rem',
              background: `linear-gradient(to right, ${data?.accentBlue || '#00d4ff'}, ${data?.accentOrange || '#ff6b35'}, ${data?.accentGold || '#ffd700'})`,
            }} />
          </div>
        </div>
      </div>

      {/* Announcement Text */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Announcement Banner Text
        </h3>
        <input
          type="text"
          value={data?.announcementText || ''}
          onChange={(e) => update('announcementText', e.target.value)}
          placeholder="Available for new projects — Let's build something amazing!"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      {/* Feature Toggles */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Feature Toggles
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FEATURES.map(f => (
            <div
              key={f.key}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 1rem', borderRadius: '0.5rem',
                background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{f.label}</p>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
              <button
                onClick={() => update(f.key, !data?.[f.key])}
                style={toggleStyle(!!data?.[f.key])}
                role="switch"
                aria-checked={!!data?.[f.key]}
              >
                <span style={dotStyle(!!data?.[f.key])} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
