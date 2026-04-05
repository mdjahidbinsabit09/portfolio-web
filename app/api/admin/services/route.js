import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { servicesData } from '@/utils/data/services-data';

export async function GET() {
  await dbConnect();
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(
      servicesData.map((s, i) => ({
        title: s.title, description: s.description, icon: s.icon, order: i,
      }))
    );
  }
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(services);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const service = await Service.create(body);
  return NextResponse.json(service, { status: 201 });
}
