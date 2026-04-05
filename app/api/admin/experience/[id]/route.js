import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const exp = await Experience.findByIdAndUpdate(id, body, { new: true });
  if (!exp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(exp);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
