import Image from "next/image";

async function getGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/users/mdjahidbinsabit09', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function StatCard({ label, value }) {
  return (
    <div className="glass-card p-4 rounded-xl text-center">
      <p className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>{value}</p>
      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</p>
    </div>
  );
}

export default async function GitHubStats() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  return (
    <div className="my-12 lg:my-24 mesh-gradient-2">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
          <span className="glass-card p-2 px-5 text-xl rounded-md" style={{ color: 'var(--text-primary)' }}>
            GitHub Activity
          </span>
          <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Public Repos" value={stats.public_repos} />
        <StatCard label="Followers" value={stats.followers} />
        <StatCard label="Following" value={stats.following} />
        <StatCard label="Public Gists" value={stats.public_gists} />
      </div>
      <div className="glass-card p-4 rounded-xl overflow-hidden">
        <Image
          src={`https://ghchart.rshah.org/00d4ff/mdjahidbinsabit09`}
          alt="GitHub Contribution Chart"
          width={900}
          height={150}
          className="w-full"
          unoptimized
        />
      </div>
    </div>
  );
}
