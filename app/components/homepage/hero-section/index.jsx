import { personalData as staticPersonal } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import Terminal from "./terminal";
import HeroParticles from "./particles";
import ScrambleText from "../../helper/scramble-text";
import HelloLanguages from "./hello-languages";
import ShareButton from "./share-button";

function HeroSection({ personalData = staticPersonal }) {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12 mesh-gradient-1 overflow-hidden">
      <HeroParticles />
      <div className="relative z-10 grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-1 flex flex-col items-start justify-center p-2 pb-10 lg:pb-20 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]" style={{ color: 'var(--text-primary)' }}>
            <HelloLanguages />{', '}
            <br />
            This is {' '}
            <ScrambleText
              text={personalData.name}
              style={{ color: 'var(--accent-orange)' }}
            />
            {`, I'm a Professional `}
            <ScrambleText
              text={personalData.designation}
              style={{ color: 'var(--accent-blue)' }}
            />
            .
          </h1>

          <div className="my-6 lg:my-12 flex items-center gap-5">
            {[
              { href: personalData.github, Icon: BsGithub },
              { href: personalData.linkedIn, Icon: BsLinkedin },
              { href: personalData.facebook, Icon: FaFacebook },
              { href: personalData.leetcode, Icon: SiLeetcode },
              { href: personalData.twitter, Icon: FaTwitterSquare },
            ].map(({ href, Icon }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                className="transition-all hover:scale-125 duration-300"
                style={{ color: 'var(--accent-blue)' }}
              >
                <Icon size={30} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="#contact" className="rounded-full p-[1px] transition-all duration-300" style={{ background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))' }}>
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link
              className="flex items-center gap-1 hover:gap-3 rounded-full px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-black no-underline transition-all duration-200 ease-out md:font-semibold"
              style={{ background: 'linear-gradient(to right, var(--accent-orange), var(--accent-gold))' }}
              role="button"
              target="_blank"
              href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>

            <ShareButton />
          </div>
        </div>

        <div className="order-2">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
