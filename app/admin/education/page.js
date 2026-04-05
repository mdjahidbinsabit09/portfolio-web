"use client";
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import DeleteModal from '../components/DeleteModal';

const inputStyle = {
  width: '100%', padding: '0.6rem 0.85rem',
  background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
  borderRadius: '0.4rem', color: 'var(--text-primary)',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
};

const emptyForm = { title: '', duration: '', institution: '' };

export default function EducationPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Inline form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/education');
      if (!res.ok) throw new Error('Failed to fetch education');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load education');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // --- Add ---
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addForm.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add education');
      }
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setAddForm(emptyForm);
      setShowAddForm(false);
      toast.success('Education added');
    } catch (err) {
      toast.error(err.message || 'Failed to add education');
    } finally {
      setSaving(false);
    }
  };

  // --- Edit ---
  const startEdit = (item) => {
    setEditId(item._id);
    setEditForm({
      title: item.title || '',
      duration: item.duration || '',
      institution: item.institution || '',
    });
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm(emptyForm);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/education/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update education');
      }
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i._id === editId ? { ...i, ...updated } : i)));
      cancelEdit();
      toast.success('Education updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update education');
    } finally {
      setSaving(false);
    }
  };

  // --- Delete ---
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/education/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete education');
      }
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      if (editId === deleteTarget._id) cancelEdit();
      toast.success('Education deleted');
    } catch (err) {
      toast.error(err.message || 'Failed to delete education');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // --- Inline form renderer ---
  const renderForm = ({ form, setForm, onSubmit, onCancel, submitLabel }) => (
    <form onSubmit={onSubmit} className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <FormField label="Title" required>
          <input
            style={inputStyle}
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. B.Sc. Computer Science"
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </FormField>
        <FormField label="Institution">
          <input
            style={inputStyle}
            value={form.institution}
            onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
            placeholder="e.g. MIT"
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
        </FormField>
      </div>
      <FormField label="Duration">
        <input
          style={inputStyle}
          value={form.duration}
          onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
          placeholder="e.g. 2018 - 2022"
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
        />
      </FormField>
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.5rem 1rem', borderRadius: '0.4rem',
            border: '1px solid var(--border-color)', background: 'var(--glass-bg)',
            color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.825rem',
          }}
        >
          <FiX size={14} /> Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.5rem 1rem', borderRadius: '0.4rem', border: 'none',
            background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
            color: '#000', fontWeight: 600, fontSize: '0.825rem',
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
          }}
        >
          <FiCheck size={14} /> {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Loading education...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <PageHeader
        title="Education"
        description="Manage your education and qualifications"
        action={
          !showAddForm && (
            <button
              onClick={() => { setShowAddForm(true); cancelEdit(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.55rem 1.1rem', border: 'none', borderRadius: '0.4rem',
                background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
                color: '#000', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              }}
            >
              <FiPlus size={16} /> Add Education
            </button>
          )
        }
      />

      {/* Add form */}
      {showAddForm &&
        renderForm({
          form: addForm,
          setForm: setAddForm,
          onSubmit: handleAdd,
          onCancel: () => { setShowAddForm(false); setAddForm(emptyForm); },
          submitLabel: 'Add',
        })}

      {/* Education list */}
      {items.length === 0 && !showAddForm ? (
        <div
          className="glass-card"
          style={{ padding: '3rem 1.5rem', textAlign: 'center', borderRadius: '0.75rem' }}
        >
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
            No education entries yet. Click "Add Education" to create one.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item) =>
            editId === item._id ? (
              <div key={item._id}>
                {renderForm({
                  form: editForm,
                  setForm: setEditForm,
                  onSubmit: handleUpdate,
                  onCancel: cancelEdit,
                  submitLabel: 'Save',
                })}
              </div>
            ) : (
              <div
                key={item._id}
                className="glass-card"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem', borderRadius: '0.75rem', gap: '1rem',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  {item.institution && (
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.825rem', color: 'var(--accent-blue)' }}>
                      {item.institution}
                    </p>
                  )}
                  {item.duration && (
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {item.duration}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button
                    onClick={() => startEdit(item)}
                    title="Edit"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '32px', height: '32px', borderRadius: '0.35rem',
                      border: '1px solid var(--border-color)', background: 'var(--glass-bg)',
                      color: 'var(--accent-blue)', cursor: 'pointer',
                    }}
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    title="Delete"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '32px', height: '32px', borderRadius: '0.35rem',
                      border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)',
                      color: '#ef4444', cursor: 'pointer',
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || 'education'}
        loading={deleting}
      />
    </div>
  );
}
