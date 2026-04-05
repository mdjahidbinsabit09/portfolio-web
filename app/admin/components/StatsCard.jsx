export default function StatsCard({ label, value, icon: Icon, color }) {
  return (
    <div className="glass-card" style={{
      padding: '1.25rem', borderRadius: '0.75rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '0.75rem',
        background: `${color || 'var(--accent-blue)'}15`,
        border: `1px solid ${color || 'var(--accent-blue)'}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color || 'var(--accent-blue)', flexShrink: 0,
      }}>
        {Icon && <Icon size={22} />}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</p>
      </div>
    </div>
  );
}
