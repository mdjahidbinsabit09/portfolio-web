import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { projectsData } from '@/utils/data/projects-data';

export async function GET() {
  await dbConnect();
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(
      projectsData.map((p, i) => ({
        name: p.name, description: p.description,
        tools: p.tools, role: p.role,
        code: p.code, demo: p.demo,
        image: p.image, category: p.category, order: i,
      }))
    );
  }
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const project = await Project.create(body);
  return NextResponse.json(project, { status: 201 });
}
