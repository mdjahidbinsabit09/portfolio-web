import { educations as staticEducations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import SectionReveal from "../../helper/section-reveal";

function Education({ educations = staticEducations }) {
  return (
    <SectionReveal>
      <div id="education" className="relative z-50 border-t my-12 lg:my-24" style={{ borderColor: 'var(--border-color)' }}>
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
            <span className="glass-card w-fit p-2 px-5 text-xl rounded-md" style={{ color: 'var(--text-primary)' }}>
              Education
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex justify-center items-start">
              <div className="w-3/4 h-3/4">
                <AnimationLottie animationPath={lottieFile} />
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-6">
                {educations.map((education, i) => (
                  <GlowCard key={education._id || education.id || i} identifier={`education-${education._id || education.id || i}`}>
                    <div className="p-3 relative" style={{ color: 'var(--text-primary)' }}>
                      <Image
                        src="/blur-23.svg"
                        alt=""
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-40"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--accent-blue)' }}>
                          {education.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="transition-all duration-300 hover:scale-125" style={{ color: 'var(--accent-orange)' }}>
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase" style={{ color: 'var(--text-primary)' }}>
                            {education.title}
                          </p>
                          <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>{education.institution}</p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default Education;