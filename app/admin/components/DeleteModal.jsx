"use client";
import { motion, AnimatePresence } from 'framer-motion';

export default function DeleteModal({ open, onClose, onConfirm, title, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '100%',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem', fontSize: '1.5rem',
            }}>
              🗑️
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Delete {title || 'item'}?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={onClose}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: '0.4rem',
                  border: '1px solid var(--border-color)', background: 'var(--glass-bg)',
                  color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.875rem',
                }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: '0.4rem',
                  border: 'none', background: '#ef4444',
                  color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem', opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
