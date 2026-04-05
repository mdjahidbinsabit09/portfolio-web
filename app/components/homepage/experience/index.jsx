import { experiences as staticExperiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import expLottie from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import SectionReveal from "../../helper/section-reveal";

function TimelineDot() {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="relative flex items-center gap-2">
        <div
          className="h-[1px] w-10"
          style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue))' }}
        />
        <div className="relative w-3 h-3">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--accent-blue)', opacity: 0.3 }}
          />
          <div
            className="absolute inset-0 rounded-full pulse-dot"
            style={{ background: 'var(--accent-blue)' }}
          />
        </div>
        <div
          className="h-[1px] w-10"
          style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}
        />
      </div>
    </div>
  );
}

function Experience({ experiences = staticExperiences }) {
  return (
    <SectionReveal>
      <div id="experience" className="relative z-50 border-t my-12 lg:my-24" style={{ borderColor: 'var(--border-color)' }}>
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
              Experiences
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex justify-center items-start">
              <div className="w-full h-full">
                <AnimationLottie animationPath={expLottie} />
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                {experiences.map((exp, idx) => (
                  <div key={exp._id || exp.id}>
                    <GlowCard identifier={`experience-${exp._id || exp.id}`}>
                      <div className="p-3 relative">
                        <Image
                          src="/blur-23.svg"
                          alt=""
                          width={1080}
                          height={200}
                          className="absolute bottom-0 opacity-40"
                        />
                        <div className="flex justify-center">
                          <p className="text-xs sm:text-sm" style={{ color: 'var(--accent-blue)' }}>
                            {exp.duration}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-8 px-3 py-5">
                          <div className="transition-all duration-300 hover:scale-125" style={{ color: 'var(--accent-orange)' }}>
                            <BsPersonWorkspace size={36} />
                          </div>
                          <div>
                            <p className="text-base sm:text-xl mb-2 font-medium uppercase" style={{ color: 'var(--text-primary)' }}>
                              {exp.title}
                            </p>
                            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                    {idx < experiences.length - 1 && <TimelineDot />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default Experience;
