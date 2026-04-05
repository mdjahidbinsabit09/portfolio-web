"use client";
import { TypeAnimation } from "react-type-animation";

export default function Terminal() {
  return (
    <div className="glass-card rounded-xl overflow-hidden text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs" style={{ color: 'var(--text-secondary)' }}>sabit@portfolio:~</span>
      </div>
      <div className="p-4 lg:p-6 min-h-[280px]">
        <TypeAnimation
          sequence={[
            '$ whoami\n> MD Jahid Bin Sabit\n> WordPress & Full Stack Developer\n> Based in Kushtia, Bangladesh',
            3000,
            '$ cat skills.txt\n> WordPress | PHP | JavaScript | React\n> Next.js | MySQL | MongoDB | Python\n> Laravel | Express | Tailwind CSS',
            3000,
            '$ echo $STATUS\n> Available for hire!\n> Contact: mail@jbsabit.com',
            3000,
            '$ cat experience.txt\n> 4+ years of development\n> 30+ projects delivered\n> 20+ happy clients',
            3000,
          ]}
          wrapper="pre"
          speed={40}
          deletionSpeed={70}
          repeat={Infinity}
          className="whitespace-pre-wrap text-xs md:text-sm"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        />
      </div>
    </div>
  );
}
