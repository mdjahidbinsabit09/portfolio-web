import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { educations as staticEducations } from '@/utils/data/educations';

export async function GET() {
  await dbConnect();
  const count = await Education.countDocuments();
  if (count === 0) {
    await Education.insertMany(
      staticEducations.map((e, i) => ({
        title: e.title, duration: e.duration, institution: e.institution, order: i,
      }))
    );
  }
  const educations = await Education.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(educations);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const edu = await Education.create(body);
  return NextResponse.json(edu, { status: 201 });
}
