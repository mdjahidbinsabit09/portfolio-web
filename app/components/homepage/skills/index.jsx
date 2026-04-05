// @flow strict
"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import OrbitAnimation from "./orbit-animation";
import SkillBars from "./skill-bars";
import RadarChart from "./radar-chart";
import SectionReveal from "../../helper/section-reveal";

function Skills({ skills = skillsData }) {
  return (
    <SectionReveal>
      <div id="skills" className="relative z-50 border-t my-12 lg:my-24" style={{ borderColor: 'var(--border-color)' }}>
        <Image
          src="/section.svg"
          alt="Section background"
          width={1572}
          height={795}
          className="absolute top-0 -z-10 opacity-20"
        />

        <div className="flex justify-center my-5 lg:py-8">
          <div className="flex items-center">
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}></span>
            <span className="glass-card w-fit p-2 px-5 text-xl rounded-md gradient-text-animate">
              Skills
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <div className="hidden lg:flex justify-center mb-8">
          <OrbitAnimation />
        </div>

        <div className="w-full my-12">
          <Marquee
            gradient={false}
            speed={80}
            pauseOnHover={true}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction="left"
          >
            {skills.map((skill, id) => (
              <div
                className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
                key={id}
              >
                <div
                  className="h-full w-full rounded-lg border transition-all duration-500"
                  style={{
                    border: '1px solid var(--border-color)',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <div className="flex -translate-y-[1px] justify-center">
                    <div className="w-3/4">
                      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue), transparent)' }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 p-6">
                    <div className="h-8 sm:h-10">
                      <Image
                        src={skillsImage(skill)?.src}
                        alt={skill}
                        width={40}
                        height={40}
                        className="h-full w-auto rounded-lg"
                      />
                    </div>
                    <p className="text-sm sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                      {skill}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillBars />
          <RadarChart />
        </div>
      </div>
    </SectionReveal>
  );
}

export default Skills;
