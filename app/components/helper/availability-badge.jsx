import { personalData } from "@/utils/data/personal-data";

export default function AvailabilityBadge() {
  const isAvailable = personalData.available;
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium">
      <span className={`h-2 w-2 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
      <span style={{ color: 'var(--text-primary)' }}>{isAvailable ? "Available for Hire" : "Currently Busy"}</span>
    </div>
  );
}
