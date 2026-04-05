import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>404</h1>
      <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>Page Not Found</p>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Sorry, the page you are looking for does not exist.</p>
      <Link
        className="mt-5 flex items-center gap-1 hover:gap-3 rounded-full px-3 md:px-8 py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-black no-underline transition-all duration-200 ease-out hover:no-underline md:font-semibold"
        style={{ background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))' }}
        role="button"
        href="/"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default page;
