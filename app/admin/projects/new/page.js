"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import FormField from '../../components/FormField';
import ImageUploader from '../../components/ImageUploader';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

export default function NewProjectPage() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', description: '', tools: '', role: '', code: '', demo: '', image: '', category: 'WordPress' }
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const imageValue = watch('image');

  const onSubmit = async (data) => {
    setSaving(true);
    const payload = { ...data, tools: data.tools.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Project created');
        router.push('/admin/projects');
      } else toast.error('Failed to create project');
    } catch { toast.error('Failed to create project'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title="New Project"
        description="Add a new project to your portfolio"
        action={
          <button onClick={handleSubmit(onSubmit)} disabled={saving} style={{
            padding: '0.55rem 1.5rem', border: 'none', borderRadius: '0.4rem',
            background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
            color: '#000', fontWeight: 600, fontSize: '0.85rem',
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
          }}>
            {saving ? 'Creating...' : 'Create Project'}
          </button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
          <ImageUploader label="Project Image" value={imageValue} onChange={(url) => setValue('image', url)} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 1rem' }}>
            <FormField label="Project Name" required error={errors.name?.message}>
              <input {...register('name', { required: 'Name is required' })} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
            </FormField>

            <FormField label="Category">
              <select {...register('category')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="WordPress">WordPress</option>
                <option value="Full Stack">Full Stack</option>
              </select>
            </FormField>

            <FormField label="Role">
              <input {...register('role')} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
            </FormField>

            <FormField label="Tools (comma separated)">
              <input {...register('tools')} placeholder="React, Node.js, MongoDB" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
            </FormField>

            <FormField label="Live Demo URL">
              <input {...register('demo')} type="url" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
            </FormField>

            <FormField label="GitHub URL">
              <input {...register('code')} type="url" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
            </FormField>
          </div>

          <FormField label="Description">
            <textarea {...register('description')} rows={4} style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'} />
          </FormField>
        </div>
      </form>
    </div>
  );
}
