"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import ImageUploader from '../components/ImageUploader';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

export default function PersonalPage() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const profileValue = watch('profile');

  useEffect(() => {
    fetch('/api/admin/personal')
      .then(r => r.json())
      .then(data => { reset(data); setLoading(false); })
      .catch(() => { toast.error('Failed to load data'); setLoading(false); });
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/personal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success('Saved successfully');
      else toast.error('Failed to save');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="shimmer" style={{ height: '400px', borderRadius: '1rem' }} />;

  const fields = [
    { name: 'name', label: 'Full Name', required: true },
    { name: 'designation', label: 'Designation', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone' },
    { name: 'address', label: 'Address' },
    { name: 'github', label: 'GitHub URL' },
    { name: 'linkedIn', label: 'LinkedIn URL' },
    { name: 'facebook', label: 'Facebook URL' },
    { name: 'twitter', label: 'Twitter URL' },
    { name: 'stackOverflow', label: 'Stack Overflow URL' },
    { name: 'leetcode', label: 'LeetCode URL' },
    { name: 'devUsername', label: 'Dev.to Username' },
    { name: 'resume', label: 'Resume URL' },
  ];

  return (
    <div>
      <PageHeader
        title="Personal Info"
        description="Edit your personal details, social links, and bio"
        action={
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
            style={{
              padding: '0.55rem 1.5rem', border: 'none', borderRadius: '0.4rem',
              background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
              color: '#000', fontWeight: 600, fontSize: '0.85rem',
              cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', marginTop: 0, color: 'var(--text-primary)' }}>Profile</h3>

          <ImageUploader
            label="Profile Photo"
            value={profileValue}
            onChange={(url) => setValue('profile', url)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 1rem' }}>
            {fields.map(f => (
              <FormField key={f.name} label={f.label} required={f.required} error={errors[f.name]?.message}>
                <input
                  {...register(f.name, f.required ? { required: `${f.label} is required` } : {})}
                  type={f.type || 'text'}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                />
              </FormField>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', marginTop: 0, color: 'var(--text-primary)' }}>Bio / Description</h3>
          <FormField label="About yourself" error={errors.description?.message}>
            <textarea
              {...register('description')}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </FormField>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', marginTop: 0, color: 'var(--text-primary)' }}>Availability</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" {...register('available')} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-blue)' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Available for new projects</span>
          </label>
        </div>
      </form>
    </div>
  );
}
