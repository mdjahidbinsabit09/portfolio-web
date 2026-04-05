import AdminShell from './components/AdminShell';

export const metadata = {
  title: 'Admin Panel - Portfolio',
  description: 'Manage your portfolio content and settings',
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
