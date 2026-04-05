import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Stat from '@/models/Stat';
import Testimonial from '@/models/Testimonial';
import Service from '@/models/Service';

import { personalData } from '@/utils/data/personal-data';
import { projectsData } from '@/utils/data/projects-data';
import { skillsData } from '@/utils/data/skills';
import { experiences } from '@/utils/data/experience';
import { educations } from '@/utils/data/educations';
import { statsData } from '@/utils/data/stats-data';
import { testimonialsData } from '@/utils/data/testimonials-data';
import { servicesData } from '@/utils/data/services-data';

export async function POST() {
  try {
    await dbConnect();

    const results = {};

    // Settings
    await Settings.deleteMany({});
    await Settings.create({
      name: personalData.name,
      profile: personalData.profile,
      designation: personalData.designation,
      description: personalData.description,
      email: personalData.email,
      phone: personalData.phone,
      address: personalData.address,
      github: personalData.github,
      facebook: personalData.facebook,
      linkedIn: personalData.linkedIn,
      twitter: personalData.twitter,
      stackOverflow: personalData.stackOverflow,
      leetcode: personalData.leetcode,
      devUsername: personalData.devUsername,
      resume: personalData.resume,
      available: personalData.available ?? true,
      siteTitle: `${personalData.name} - Portfolio`,
      siteDescription: personalData.designation,
    });
    results.settings = 'created';

    // Projects
    await Project.deleteMany({});
    await Project.insertMany(
      projectsData.map((p, i) => ({
        name: p.name, description: p.description,
        tools: p.tools, role: p.role,
        code: p.code, demo: p.demo,
        image: p.image, category: p.category, order: i,
      }))
    );
    results.projects = projectsData.length;

    // Skills
    await Skill.deleteMany({});
    await Skill.insertMany(skillsData.map((name, i) => ({ name, order: i })));
    results.skills = skillsData.length;

    // Experience
    await Experience.deleteMany({});
    await Experience.insertMany(
      experiences.map((e, i) => ({ title: e.title, company: e.company, duration: e.duration, order: i }))
    );
    results.experiences = experiences.length;

    // Education
    await Education.deleteMany({});
    await Education.insertMany(
      educations.map((e, i) => ({ title: e.title, duration: e.duration, institution: e.institution, order: i }))
    );
    results.educations = educations.length;

    // Stats
    await Stat.deleteMany({});
    await Stat.insertMany(
      statsData.map((s, i) => ({ label: s.label, value: s.value, suffix: s.suffix, order: i }))
    );
    results.stats = statsData.length;

    // Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(
      testimonialsData.map((t, i) => ({ name: t.name, role: t.role, text: t.text, rating: t.rating, order: i }))
    );
    results.testimonials = testimonialsData.length;

    // Services
    await Service.deleteMany({});
    await Service.insertMany(
      servicesData.map((s, i) => ({ title: s.title, description: s.description, icon: s.icon, order: i }))
    );
    results.services = servicesData.length;

    return NextResponse.json({ success: true, seeded: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
