"use client";
import { useState, useRef } from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function ImageUploader({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large (max 5MB)');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
        toast.success('Image uploaded');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}

      {value ? (
        <div style={{ position: 'relative', display: 'inline-block', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <Image src={value} alt="Preview" width={200} height={120} style={{ objectFit: 'cover', display: 'block' }} />
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '0.35rem', right: '0.35rem',
              background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%',
              width: '24px', height: '24px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            padding: '2rem', width: '100%', borderRadius: '0.5rem',
            border: '2px dashed var(--border-color)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <FiUploadCloud size={28} />
          <span style={{ fontSize: '0.85rem' }}>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>PNG, JPG, SVG up to 5MB</span>
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />

      {/* Also allow manual URL entry */}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        style={{
          width: '100%', marginTop: '0.5rem', padding: '0.5rem 0.75rem',
          background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
          borderRadius: '0.4rem', color: 'var(--text-primary)',
          fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      />
    </div>
  );
}
