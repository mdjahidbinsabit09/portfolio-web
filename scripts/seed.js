/**
 * Seed script — populates MongoDB from existing static data files.
 *
 * Usage:
 *   MONGODB_URI="mongodb+srv://..." node scripts/seed.js
 *
 * This reads the static JS data files and inserts them into MongoDB collections.
 * Safe to run multiple times — it clears collections before inserting.
 */

import mongoose from 'mongoose';
import { personalData } from '../utils/data/personal-data.js';
import { projectsData } from '../utils/data/projects-data.js';
import { skillsData } from '../utils/data/skills.js';
import { experiences } from '../utils/data/experience.js';
import { educations } from '../utils/data/educations.js';
import { statsData } from '../utils/data/stats-data.js';
import { testimonialsData } from '../utils/data/testimonials-data.js';
import { servicesData } from '../utils/data/services-data.js';

// Import models
import Settings from '../models/Settings.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Stat from '../models/Stat.js';
import Testimonial from '../models/Testimonial.js';
import Service from '../models/Service.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  console.error('   Usage: MONGODB_URI="mongodb+srv://..." node scripts/seed.js');
  process.exit(1);
}

async function seed() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected\n');

  // --- Settings (personal data) ---
  console.log('📝 Seeding Settings (personal data)...');
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
  console.log('   ✅ Settings created\n');

  // --- Projects ---
  console.log('📂 Seeding Projects...');
  await Project.deleteMany({});
  const projects = projectsData.map((p, i) => ({
    name: p.name,
    description: p.description,
    tools: p.tools,
    role: p.role,
    code: p.code,
    demo: p.demo,
    image: p.image,
    category: p.category,
    order: i,
  }));
  await Project.insertMany(projects);
  console.log(`   ✅ ${projects.length} projects created\n`);

  // --- Skills ---
  console.log('⚡ Seeding Skills...');
  await Skill.deleteMany({});
  const skills = skillsData.map((name, i) => ({ name, order: i }));
  await Skill.insertMany(skills);
  console.log(`   ✅ ${skills.length} skills created\n`);

  // --- Experience ---
  console.log('💼 Seeding Experience...');
  await Experience.deleteMany({});
  const exps = experiences.map((e, i) => ({
    title: e.title,
    company: e.company,
    duration: e.duration,
    order: i,
  }));
  await Experience.insertMany(exps);
  console.log(`   ✅ ${exps.length} experiences created\n`);

  // --- Education ---
  console.log('🎓 Seeding Education...');
  await Education.deleteMany({});
  const edus = educations.map((e, i) => ({
    title: e.title,
    duration: e.duration,
    institution: e.institution,
    order: i,
  }));
  await Education.insertMany(edus);
  console.log(`   ✅ ${edus.length} education entries created\n`);

  // --- Stats ---
  console.log('📊 Seeding Stats...');
  await Stat.deleteMany({});
  const stats = statsData.map((s, i) => ({
    label: s.label,
    value: s.value,
    suffix: s.suffix,
    order: i,
  }));
  await Stat.insertMany(stats);
  console.log(`   ✅ ${stats.length} stats created\n`);

  // --- Testimonials ---
  console.log('💬 Seeding Testimonials...');
  await Testimonial.deleteMany({});
  const testimonials = testimonialsData.map((t, i) => ({
    name: t.name,
    role: t.role,
    text: t.text,
    rating: t.rating,
    order: i,
  }));
  await Testimonial.insertMany(testimonials);
  console.log(`   ✅ ${testimonials.length} testimonials created\n`);

  // --- Services ---
  console.log('🔧 Seeding Services...');
  await Service.deleteMany({});
  const services = servicesData.map((s, i) => ({
    title: s.title,
    description: s.description,
    icon: s.icon,
    order: i,
  }));
  await Service.insertMany(services);
  console.log(`   ✅ ${services.length} services created\n`);

  console.log('🎉 Seed complete! All data has been migrated to MongoDB.');

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
