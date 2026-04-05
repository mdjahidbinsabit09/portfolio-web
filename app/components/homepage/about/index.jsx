import { personalData as staticPersonal } from "@/utils/data/personal-data";
import Image from "next/image";
import SectionReveal from "../../helper/section-reveal";

function AboutSection({ personalData = staticPersonal }) {
  return (
    <SectionReveal>
      <div id="about" className="my-12 lg:my-16 relative mesh-gradient-2">
        <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
          <span className="glass-card w-fit rotate-90 p-2 px-5 text-xl rounded-md" style={{ color: 'var(--text-primary)' }}>
            ABOUT ME
          </span>
          <span className="h-36 w-[2px]" style={{ backgroundColor: 'var(--border-color)' }}></span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-medium mb-5 text-xl uppercase" style={{ color: 'var(--accent-blue)' }}>
              Who I am?
            </p>
            <p className="text-sm lg:text-lg" style={{ color: 'var(--text-secondary)' }}>
              {personalData.description}
            </p>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="MD Jahid Bin Sabit"
              className="rounded-lg transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-110 cursor-pointer w-48 h-48 sm:w-64 sm:h-64 lg:w-[280px] lg:h-[280px]"
              style={{ border: '2px solid var(--border-color)' }}
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default AboutSection;