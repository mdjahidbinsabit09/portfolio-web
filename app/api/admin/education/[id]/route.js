import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const edu = await Education.findByIdAndUpdate(id, body, { new: true });
  if (!edu) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(edu);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;
  await Education.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
