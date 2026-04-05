/**
 * Server-side data fetching from MongoDB with fallback to static files.
 * Used by public-facing pages (app/page.js) to display admin-managed content.
 */
import dbConnect from './mongodb';
import Settings from '@/models/Settings';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Stat from '@/models/Stat';
import Testimonial from '@/models/Testimonial';
import Service from '@/models/Service';

// Static fallbacks
import { personalData as staticPersonal } from '@/utils/data/personal-data';
import { projectsData as staticProjects } from '@/utils/data/projects-data';
import { skillsData as staticSkills } from '@/utils/data/skills';
import { experiences as staticExperiences } from '@/utils/data/experience';
import { educations as staticEducations } from '@/utils/data/educations';
import { statsData as staticStats } from '@/utils/data/stats-data';
import { testimonialsData as staticTestimonials } from '@/utils/data/testimonials-data';
import { servicesData as staticServices } from '@/utils/data/services-data';

async function tryDB(fn, fallback) {
  try {
    await dbConnect();
    const result = await fn();
    if (!result || (Array.isArray(result) && result.length === 0)) return fallback;
    return JSON.parse(JSON.stringify(result)); // strip Mongoose metadata
  } catch {
    return fallback;
  }
}

export async function getPersonalData() {
  return tryDB(
    () => Settings.findOne().lean(),
    staticPersonal
  );
}

export async function getProjects() {
  return tryDB(
    () => Project.find().sort({ order: 1, createdAt: -1 }).lean(),
    staticProjects
  );
}

export async function getSkills() {
  const result = await tryDB(
    () => Skill.find().sort({ order: 1 }).lean(),
    null
  );
  if (!result) return staticSkills;
  return result.map(s => s.name);
}

export async function getExperiences() {
  return tryDB(
    () => Experience.find().sort({ order: 1, createdAt: -1 }).lean(),
    staticExperiences
  );
}

export async function getEducations() {
  return tryDB(
    () => Education.find().sort({ order: 1, createdAt: -1 }).lean(),
    staticEducations
  );
}

export async function getStats() {
  return tryDB(
    () => Stat.find().sort({ order: 1 }).lean(),
    staticStats
  );
}

export async function getTestimonials() {
  return tryDB(
    () => Testimonial.find().sort({ order: 1, createdAt: -1 }).lean(),
    staticTestimonials
  );
}

export async function getServices() {
  return tryDB(
    () => Service.find().sort({ order: 1, createdAt: -1 }).lean(),
    staticServices
  );
}

export async function getDesignSettings() {
  const defaults = {
    accentBlue: '#00d4ff',
    accentOrange: '#ff6b35',
    accentGold: '#ffd700',
    enableParticles: true,
    enableCursor: true,
    enableMouseTrail: true,
    enableFloatingOrbs: true,
    enableScrollProgress: true,
    enableAnnouncement: true,
    enableSectionDots: true,
    enableCommandPalette: true,
    enableKonami: true,
    announcementText: 'Available for new projects — Let\'s build something amazing!',
  };
  return tryDB(
    async () => {
      const s = await Settings.findOne().lean();
      return s ? { ...defaults, ...s } : defaults;
    },
    defaults
  );
}

/** Fetch all public data in one call (for app/page.js) */
export async function getAllPublicData() {
  const [personal, projects, skills, experiences, educations, stats, testimonials, services, design] =
    await Promise.all([
      getPersonalData(),
      getProjects(),
      getSkills(),
      getExperiences(),
      getEducations(),
      getStats(),
      getTestimonials(),
      getServices(),
      getDesignSettings(),
    ]);

  return { personal, projects, skills, experiences, educations, stats, testimonials, services, design };
}
