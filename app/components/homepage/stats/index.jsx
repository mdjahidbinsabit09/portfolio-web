"use client";
import { statsData } from "@/utils/data/stats-data";
import Odometer from "./odometer";
import SectionReveal from "../../helper/section-reveal";

export default function Stats({ stats = statsData }) {
  return (
    <SectionReveal>
      <div className="my-12 lg:my-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-xl text-center">
              <Odometer value={stat.value} suffix={stat.suffix} />
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
