import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { testimonialsData } from '@/utils/data/testimonials-data';

export async function GET() {
  await dbConnect();
  const count = await Testimonial.countDocuments();
  if (count === 0) {
    await Testimonial.insertMany(
      testimonialsData.map((t, i) => ({
        name: t.name, role: t.role, text: t.text, rating: t.rating, order: i,
      }))
    );
  }
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(testimonials);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const testimonial = await Testimonial.create(body);
  return NextResponse.json(testimonial, { status: 201 });
}
