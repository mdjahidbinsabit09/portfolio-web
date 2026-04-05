import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import { experiences as staticExperiences } from '@/utils/data/experience';

export async function GET() {
  await dbConnect();
  const count = await Experience.countDocuments();
  if (count === 0) {
    await Experience.insertMany(
      staticExperiences.map((e, i) => ({
        title: e.title, company: e.company, duration: e.duration, order: i,
      }))
    );
  }
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(experiences);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const exp = await Experience.create(body);
  return NextResponse.json(exp, { status: 201 });
}
