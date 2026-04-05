import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  await dbConnect();
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return NextResponse.json({
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    ogImage: settings.ogImage,
  });
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(body);
  } else {
    Object.assign(settings, body);
    await settings.save();
  }
  return NextResponse.json(settings);
}
