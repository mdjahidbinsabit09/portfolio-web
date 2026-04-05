import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { skillsData } from '@/utils/data/skills';

export async function GET() {
  await dbConnect();
  const count = await Skill.countDocuments();
  if (count === 0) {
    await Skill.insertMany(skillsData.map((name, i) => ({ name, order: i })));
  }
  const skills = await Skill.find().sort({ order: 1 });
  return NextResponse.json(skills);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  // Accept either an array of skill objects or { skills: [...] }
  const skillsArray = Array.isArray(body) ? body : body.skills || [];
  await Skill.deleteMany({});
  const docs = skillsArray.map((item, i) => ({
    name: typeof item === 'string' ? item : item.name,
    order: i,
  }));
  const created = await Skill.insertMany(docs);
  return NextResponse.json(created);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const count = await Skill.countDocuments();
  const skill = await Skill.create({ ...body, order: count });
  return NextResponse.json(skill, { status: 201 });
}
