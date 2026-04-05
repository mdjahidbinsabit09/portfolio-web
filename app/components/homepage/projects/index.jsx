// @flow strict
import Image from "next/image";
import { projectsData } from "@/utils/data/projects-data";
import ProjectFilter from "./project-filter";
import SectionReveal from "../../helper/section-reveal";

function Projects({ projects = projectsData }) {
  return (
    <SectionReveal>
      <div id="projects" className="relative z-50 border-t my-12 lg:my-24" style={{ borderColor: 'var(--border-color)' }}>
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
              Projects
            </span>
            <span className="w-24 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-blue))' }}></span>
          </div>
        </div>

        <div className="py-8">
          <ProjectFilter projects={projects} />
        </div>
      </div>
    </SectionReveal>
  );
}

export default Projects;
