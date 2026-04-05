"use client";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiStar } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import DeleteModal from '../components/DeleteModal';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

const btnStyle = (bg, color = '#fff') => ({
  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
  padding: '0.4rem 0.85rem', border: 'none', borderRadius: '0.4rem',
  background: bg, color, fontWeight: 600, fontSize: '0.8rem',
  cursor: 'pointer', whiteSpace: 'nowrap',
});

const emptyForm = { name: '', role: '', text: '', rating: 5 };

function StarRating({ rating }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <FiStar
          key={i}
          size={14}
          style={{
            color: i <= rating ? 'var(--accent-gold)' : 'var(--text-secondary)',
            fill: i <= rating ? 'var(--accent-gold)' : 'none',
          }}
        />
      ))}
    </span>
  );
}

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [editData, setEditData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const [deleting, setDeleting] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating: Number(formData.rating) }),
      });
      if (!res.ok) throw new Error('Failed to create');
      const created = await res.json();
      setItems(prev => [created, ...prev]);
      setFormData(emptyForm);
      setShowForm(false);
      toast.success('Testimonial created');
    } catch {
      toast.error('Failed to create testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editData, rating: Number(editData.rating) }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setItems(prev => prev.map(item => item._id === id ? updated : item));
      setEditingId(null);
      toast.success('Testimonial updated');
    } catch {
      toast.error('Failed to update testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const item = deleteModal.item;
    if (!item) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${item._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setItems(prev => prev.filter(i => i._id !== item._id));
      setDeleteModal({ open: false, item: null });
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete testimonial');
    } finally {
      setDeleting(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({ name: item.name, role: item.role || '', text: item.text || '', rating: item.rating || 5 });
    setShowForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(emptyForm);
  };

  const openNewForm = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData(emptyForm);
  };

  if (loading) {
    return (
      <div>
        <div className="shimmer" style={{ height: '48px', borderRadius: '0.75rem', marginBottom: '1.5rem' }} />
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card shimmer" style={{ height: '80px', borderRadius: '0.75rem', marginBottom: '0.75rem' }} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage client testimonials and reviews"
        action={
          <button onClick={openNewForm} style={btnStyle('linear-gradient(to right, var(--accent-orange), var(--accent-gold))', '#000')}>
            <FiPlus size={15} /> Add Testimonial
          </button>
        }
      />

      {/* New testimonial form */}
      {showForm && (
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem', borderLeft: '3px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>New Testimonial</h3>
            <button onClick={() => setShowForm(false)} style={{ ...btnStyle('transparent', 'var(--text-secondary)'), padding: '0.25rem' }}>
              <FiX size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
            <FormField label="Name" required>
              <input
                style={inputStyle}
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Client name"
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </FormField>
            <FormField label="Role">
              <input
                style={inputStyle}
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. CEO at Company"
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </FormField>
            <FormField label="Rating">
              <select
                style={inputStyle}
                value={formData.rating}
                onChange={e => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </FormField>
          </div>
          <FormField label="Testimonial Text">
            <textarea
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={3}
              value={formData.text}
              onChange={e => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="What did the client say?"
              onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </FormField>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowForm(false)} style={btnStyle('var(--glass-bg)', 'var(--text-primary)')}>
              Cancel
            </button>
            <button onClick={handleCreate} disabled={saving} style={{ ...btnStyle('var(--accent-blue)'), opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
              <FiSave size={14} /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 && !showForm && (
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '0.75rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>No testimonials yet. Click "Add Testimonial" to create one.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map(item => (
          <div key={item._id} className="glass-card" style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem' }}>
            {editingId === item._id ? (
              /* Inline edit form */
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
                  <FormField label="Name" required>
                    <input
                      style={inputStyle}
                      value={editData.name}
                      onChange={e => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </FormField>
                  <FormField label="Role">
                    <input
                      style={inputStyle}
                      value={editData.role}
                      onChange={e => setEditData(prev => ({ ...prev, role: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </FormField>
                  <FormField label="Rating">
                    <select
                      style={inputStyle}
                      value={editData.rating}
                      onChange={e => setEditData(prev => ({ ...prev, rating: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
                <FormField label="Testimonial Text">
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical' }}
                    rows={3}
                    value={editData.text}
                    onChange={e => setEditData(prev => ({ ...prev, text: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </FormField>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={cancelEdit} style={btnStyle('var(--glass-bg)', 'var(--text-primary)')}>
                    <FiX size={14} /> Cancel
                  </button>
                  <button onClick={() => handleUpdate(item._id)} disabled={saving} style={{ ...btnStyle('var(--accent-blue)'), opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
                    <FiSave size={14} /> {saving ? 'Saving...' : 'Update'}
                  </button>
                </div>
              </div>
            ) : (
              /* Display row */
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.name}</span>
                    {item.role && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.role}</span>
                    )}
                    <StarRating rating={item.rating || 0} />
                  </div>
                  {item.text && (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '600px' }}>
                      {item.text}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button onClick={() => startEdit(item)} style={{ ...btnStyle('rgba(59,130,246,0.15)', 'var(--accent-blue)'), padding: '0.35rem 0.6rem' }} title="Edit">
                    <FiEdit2 size={14} />
                  </button>
                  <button onClick={() => setDeleteModal({ open: true, item })} style={{ ...btnStyle('rgba(239,68,68,0.15)', '#ef4444'), padding: '0.35rem 0.6rem' }} title="Delete">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
        title={deleteModal.item?.name ? `"${deleteModal.item.name}"` : 'testimonial'}
        loading={deleting}
      />
    </div>
  );
}
