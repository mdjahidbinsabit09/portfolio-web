"use client";

export default function FormField({ label, error, children, required }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{
          display: 'block', marginBottom: '0.35rem',
          fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)',
        }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{error}</p>
      )}
    </div>
  );
}
