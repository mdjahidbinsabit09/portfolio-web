"use client";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiBox } from 'react-icons/fi';
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

const emptyForm = { title: '', description: '', icon: '' };

export default function ServicesPage() {
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
      const res = await fetch('/api/admin/services');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create');
      const created = await res.json();
      setItems(prev => [created, ...prev]);
      setFormData(emptyForm);
      setShowForm(false);
      toast.success('Service created');
    } catch {
      toast.error('Failed to create service');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setItems(prev => prev.map(item => item._id === id ? updated : item));
      setEditingId(null);
      toast.success('Service updated');
    } catch {
      toast.error('Failed to update service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const item = deleteModal.item;
    if (!item) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${item._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setItems(prev => prev.filter(i => i._id !== item._id));
      setDeleteModal({ open: false, item: null });
      toast.success('Service deleted');
    } catch {
      toast.error('Failed to delete service');
    } finally {
      setDeleting(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({ title: item.title || '', description: item.description || '', icon: item.icon || '' });
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
        title="Services"
        description="Manage the services you offer"
        action={
          <button onClick={openNewForm} style={btnStyle('linear-gradient(to right, var(--accent-orange), var(--accent-gold))', '#000')}>
            <FiPlus size={15} /> Add Service
          </button>
        }
      />

      {/* New service form */}
      {showForm && (
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem', borderLeft: '3px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>New Service</h3>
            <button onClick={() => setShowForm(false)} style={{ ...btnStyle('transparent', 'var(--text-secondary)'), padding: '0.25rem' }}>
              <FiX size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
            <FormField label="Title" required>
              <input
                style={inputStyle}
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Service title"
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </FormField>
            <FormField label="Icon">
              <input
                style={inputStyle}
                value={formData.icon}
                onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g. FaWordpress"
                onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Use React Icons names like FaWordpress, FaPlug, FaCode, FaShoppingCart, FaServer, FaPaintBrush
              </p>
            </FormField>
          </div>
          <FormField label="Description">
            <textarea
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={3}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the service"
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
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>No services yet. Click "Add Service" to create one.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map(item => (
          <div key={item._id} className="glass-card" style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem' }}>
            {editingId === item._id ? (
              /* Inline edit form */
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1rem' }}>
                  <FormField label="Title" required>
                    <input
                      style={inputStyle}
                      value={editData.title}
                      onChange={e => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </FormField>
                  <FormField label="Icon">
                    <input
                      style={inputStyle}
                      value={editData.icon}
                      onChange={e => setEditData(prev => ({ ...prev, icon: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                    />
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      Use React Icons names like FaWordpress, FaPlug, FaCode, FaShoppingCart, FaServer, FaPaintBrush
                    </p>
                  </FormField>
                </div>
                <FormField label="Description">
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical' }}
                    rows={3}
                    value={editData.description}
                    onChange={e => setEditData(prev => ({ ...prev, description: e.target.value }))}
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
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '0.5rem', flexShrink: 0,
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 600,
                  }}>
                    <FiBox size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</span>
                      {item.icon && (
                        <span style={{
                          fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: '0.25rem',
                          background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
                          color: '#a78bfa', fontFamily: 'monospace',
                        }}>
                          {item.icon}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '550px' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
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
        title={deleteModal.item?.title ? `"${deleteModal.item.title}"` : 'service'}
        loading={deleting}
      />
    </div>
  );
}
