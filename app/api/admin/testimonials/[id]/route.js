import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
  if (!testimonial) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
