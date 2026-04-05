import { getAllPublicData } from "@/lib/get-data";
import { personalData as staticPersonal } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Stats from "./components/homepage/stats";
import Services from "./components/homepage/services";
import GitHubStats from "./components/homepage/github";
import Testimonials from "./components/homepage/testimonials";

async function getBlogs(devUsername) {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${devUsername}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
  } catch {
    return [];
  }
}

export default async function Home() {
  const { personal, projects, skills, experiences, educations, stats, testimonials, services } =
    await getAllPublicData();
  const blogs = await getBlogs(personal?.devUsername || staticPersonal.devUsername);

  return (
    <div>
      <HeroSection personalData={personal} />
      <AboutSection personalData={personal} />
      <Stats stats={stats} />
      <Services services={services} />
      <Experience experiences={experiences} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <GitHubStats />
      <Education educations={educations} />
      <Testimonials testimonials={testimonials} />
      <Blog blogs={blogs} />
      <ContactSection personalData={personal} />
    </div>
  );
}
