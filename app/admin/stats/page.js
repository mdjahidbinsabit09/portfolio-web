"use client";
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState([]);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { stats: [] },
  });

  const watchedStats = watch('stats');

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
      reset({ stats: data.map((s) => ({ _id: s._id, label: s.label || '', value: s.value ?? '', suffix: s.suffix || '' })) });
    } catch (err) {
      toast.error(err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const payload = formData.stats.map((s) => ({
        _id: s._id,
        label: s.label,
        value: Number(s.value) || 0,
        suffix: s.suffix,
      }));
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats: payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save stats');
      }
      const updated = await res.json();
      if (Array.isArray(updated)) {
        setStats(updated);
      }
      toast.success('Stats saved successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to save stats');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Loading stats...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <PageHeader
        title="Stats"
        description="Edit the statistics displayed on your portfolio"
        action={
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.55rem 1.1rem', border: 'none', borderRadius: '0.4rem',
              background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
              color: '#000', fontWeight: 600, fontSize: '0.85rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1, transition: 'opacity 0.2s',
            }}
          >
            <FiSave size={15} /> {saving ? 'Saving...' : 'Save All'}
          </button>
        }
      />

      {stats.length === 0 ? (
        <div
          className="glass-card"
          style={{ padding: '3rem 1.5rem', textAlign: 'center', borderRadius: '0.75rem' }}
        >
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
            No stats found. Stats will appear here once created via the API.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            {stats.map((stat, index) => {
              const currentValue = watchedStats?.[index]?.value ?? stat.value;
              const currentSuffix = watchedStats?.[index]?.suffix ?? stat.suffix;
              return (
                <div
                  key={stat._id}
                  className="glass-card"
                  style={{ padding: '1.5rem', borderRadius: '0.75rem' }}
                >
                  {/* Large stat preview */}
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{
                      fontSize: '2.25rem', fontWeight: 700,
                      background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-orange))',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      lineHeight: 1.2,
                    }}>
                      {currentValue || '0'}{currentSuffix || ''}
                    </span>
                  </div>

                  {/* Hidden ID field */}
                  <input type="hidden" {...register(`stats.${index}._id`)} />

                  <FormField label="Label">
                    <input
                      style={inputStyle}
                      placeholder="e.g. Projects Completed"
                      {...register(`stats.${index}.label`)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </FormField>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <FormField label="Value">
                      <input
                        type="number"
                        style={inputStyle}
                        placeholder="e.g. 50"
                        {...register(`stats.${index}.value`)}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </FormField>
                    <FormField label="Suffix">
                      <input
                        style={inputStyle}
                        placeholder="e.g. +"
                        {...register(`stats.${index}.suffix`)}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </FormField>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      )}
    </div>
  );
}
