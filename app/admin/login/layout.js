// Passthrough — AdminShell in app/admin/layout.js handles login page centering.
// Nested layouts must never render <html> or <body>.
export default function LoginLayout({ children }) {
  return children;
}
