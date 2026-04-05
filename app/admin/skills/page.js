"use client";
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiX } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/skills');
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newSkill.trim();
    if (!name) return;

    if (skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Skill already exists');
      return;
    }

    setAdding(true);
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add skill');
      }
      const created = await res.json();
      setSkills((prev) => [...prev, created]);
      setNewSkill('');
      toast.success(`"${name}" added`);
    } catch (err) {
      toast.error(err.message || 'Failed to add skill');
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id) => {
    const skill = skills.find((s) => s._id === id);
    if (!skill) return;

    setRemovingId(id);
    const updated = skills.filter((s) => s._id !== id);

    try {
      const res = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to remove skill');
      }
      setSkills(updated);
      toast.success(`"${skill.name}" removed`);
    } catch (err) {
      toast.error(err.message || 'Failed to remove skill');
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Loading skills...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px' }}>
      <PageHeader
        title="Skills"
        description="Manage the skills displayed on your portfolio"
      />

      {/* Add skill form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill name..."
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </div>
        <button
          type="submit"
          disabled={adding || !newSkill.trim()}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.25rem', border: 'none', borderRadius: '0.4rem',
            background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
            color: '#000', fontWeight: 600, fontSize: '0.875rem',
            cursor: adding || !newSkill.trim() ? 'not-allowed' : 'pointer',
            opacity: adding || !newSkill.trim() ? 0.6 : 1,
            whiteSpace: 'nowrap', transition: 'opacity 0.2s',
          }}
        >
          <FiPlus size={16} />
          {adding ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Skills list */}
      {skills.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '3rem 1.5rem', textAlign: 'center', borderRadius: '0.75rem',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
            No skills added yet. Use the input above to add your first skill.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {skills.map((skill) => (
            <div
              key={skill._id}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.45rem 0.6rem 0.45rem 0.85rem',
                background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
                borderRadius: '2rem', color: 'var(--text-primary)',
                fontSize: '0.85rem', transition: 'border-color 0.2s',
                opacity: removingId === skill._id ? 0.5 : 1,
              }}
            >
              <span>{skill.name}</span>
              <button
                onClick={() => handleRemove(skill._id)}
                disabled={removingId === skill._id}
                title={`Remove "${skill.name}"`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '20px', height: '20px', borderRadius: '50%',
                  border: 'none', background: 'rgba(239,68,68,0.15)',
                  color: '#ef4444', cursor: removingId === skill._id ? 'not-allowed' : 'pointer',
                  padding: 0, transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
              >
                <FiX size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {skills.length} skill{skills.length !== 1 ? 's' : ''} total
        </p>
      )}
    </div>
  );
}
