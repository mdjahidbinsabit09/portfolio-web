"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiGithub } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import DeleteModal from '../components/DeleteModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Project deleted');
        setProjects(prev => prev.filter(p => p._id !== deleteId));
      } else toast.error('Failed to delete');
    } catch { toast.error('Failed to delete'); }
    finally { setDeleting(false); setDeleteId(null); }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${projects.length} projects`}
        action={
          <Link
            href="/admin/projects/new"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.55rem 1.25rem', borderRadius: '0.4rem',
              background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))',
              color: '#000', fontWeight: 600, fontSize: '0.85rem',
              textDecoration: 'none',
            }}
          >
            <FiPlus size={16} /> Add Project
          </Link>
        }
      />

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card shimmer" style={{ height: '200px', borderRadius: '0.75rem' }} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '0.75rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>No projects yet</p>
          <Link href="/admin/projects/new" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Add your first project</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {projects.map(p => (
            <div key={p._id} className="glass-card" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
              {p.image && (
                <div style={{ position: 'relative', height: '140px', background: 'var(--bg-primary)' }}>
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="300px" />
                </div>
              )}
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</h3>
                  <span style={{
                    fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '9999px',
                    background: 'rgba(0,212,255,0.1)', color: 'var(--accent-blue)',
                    border: '1px solid rgba(0,212,255,0.2)',
                  }}>{p.category}</span>
                </div>
                <p style={{
                  color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0 0 0.75rem',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>{p.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {(p.tools || []).slice(0, 4).map((t, i) => (
                    <span key={i} style={{
                      fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem',
                      background: 'var(--glass-bg)', border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}>{t}</span>
                  ))}
                  {(p.tools || []).length > 4 && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>+{p.tools.length - 4}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Link
                    href={`/admin/projects/${p._id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.35rem 0.75rem', borderRadius: '0.35rem',
                      background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
                      color: 'var(--accent-blue)', fontSize: '0.75rem',
                      textDecoration: 'none', fontWeight: 500,
                    }}
                  >
                    <FiEdit2 size={12} /> Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(p._id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.35rem 0.75rem', borderRadius: '0.35rem',
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                      color: '#ef4444', fontSize: '0.75rem',
                      cursor: 'pointer', fontWeight: 500,
                    }}
                  >
                    <FiTrash2 size={12} /> Delete
                  </button>
                  <div style={{ flex: 1 }} />
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><FiExternalLink size={14} /></a>}
                  {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><FiGithub size={14} /></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="project"
        loading={deleting}
      />
    </div>
  );
}
