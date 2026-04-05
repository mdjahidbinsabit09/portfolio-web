import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  const service = await Service.findByIdAndUpdate(id, body, { new: true });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;
  await Service.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
