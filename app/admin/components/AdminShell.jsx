"use client";
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          padding: '1rem',
        }}
      >
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <AdminHeader />
        <main
          style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            background: 'var(--bg-primary)',
          }}
        >
          {children}
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}
