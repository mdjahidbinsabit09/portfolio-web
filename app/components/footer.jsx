import Link from 'next/link';

function Footer() {
  return (
    <div className="relative border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent to-transparent" style={{ '--tw-gradient-via': 'var(--accent-blue)' }}></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            &copy; {new Date().getFullYear()} <Link target="_blank" href="https://bd.linkedin.com/in/md-jahid-bin-sabit-b30a50220" style={{ color: 'var(--accent-blue)' }}>MD Jahid Bin Sabit</Link>. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
