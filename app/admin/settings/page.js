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
};

export default function SettingsPage() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const ogImageValue = watch('ogImage');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => { reset(d); setLoading(false); })
      .catch(() => { toast.error('Failed to load settings'); setLoading(false); });
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success('Settings saved');
      else toast.error('Failed to save');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="shimmer" style={{ height: '400px', borderRadius: '1rem' }} />;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="SEO metadata and site configuration"
        action={
          <button onClick={handleSubmit(onSubmit)} disabled={saving} style={{
            padding: '0.55rem 1.5rem', border: 'none', borderRadius: '0.4rem',
            background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
            color: '#000', fontWeight: 600, fontSize: '0.85rem',
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
          }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      {/* SEO Settings */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          SEO & Metadata
        </h3>

        <FormField label="Site Title">
          <input
            {...register('siteTitle')}
            placeholder="MD Jahid Bin Sabit - Portfolio"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />
        </FormField>

        <FormField label="Meta Description">
          <textarea
            {...register('siteDescription')}
            rows={3}
            placeholder="Professional WordPress & Full Stack Developer..."
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />
        </FormField>

        <ImageUploader
          label="Open Graph Image (og:image)"
          value={ogImageValue}
          onChange={(url) => setValue('ogImage', url)}
        />
      </div>

      {/* Environment Info */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Environment Configuration
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '1rem' }}>
          These settings are configured via environment variables on your hosting platform (Vercel, etc.) and cannot be changed from here for security reasons.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { name: 'MONGODB_URI', desc: 'MongoDB connection string' },
            { name: 'ADMIN_PASSWORD', desc: 'Admin panel password' },
            { name: 'JWT_SECRET', desc: 'JWT signing secret' },
            { name: 'TELEGRAM_BOT_TOKEN', desc: 'Telegram bot API token' },
            { name: 'TELEGRAM_CHAT_ID', desc: 'Telegram chat ID for notifications' },
            { name: 'EMAIL_ADDRESS', desc: 'Gmail address for contact form' },
            { name: 'GMAIL_PASSKEY', desc: 'Gmail app password' },
            { name: 'CLOUDINARY_CLOUD_NAME', desc: 'Cloudinary cloud name' },
            { name: 'CLOUDINARY_API_KEY', desc: 'Cloudinary API key' },
            { name: 'CLOUDINARY_API_SECRET', desc: 'Cloudinary API secret' },
            { name: 'NEXT_PUBLIC_GTM', desc: 'Google Tag Manager ID' },
            { name: 'NEXT_PUBLIC_RECAPTCHA_SECRET_KEY', desc: 'reCAPTCHA secret key' },
          ].map(env => (
            <div
              key={env.name}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.6rem 0.85rem', borderRadius: '0.4rem',
                background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
                gap: '1rem', flexWrap: 'wrap',
              }}
            >
              <div>
                <code style={{
                  fontSize: '0.8rem', color: 'var(--accent-blue)',
                  fontFamily: 'var(--font-jetbrains-mono, monospace)',
                }}>
                  {env.name}
                </code>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {env.desc}
                </p>
              </div>
              <span style={{
                fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
                background: 'rgba(0,212,255,0.08)', color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
              }}>
                env var
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
