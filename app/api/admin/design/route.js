import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  await dbConnect();
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return NextResponse.json({
    accentBlue: settings.accentBlue,
    accentOrange: settings.accentOrange,
    accentGold: settings.accentGold,
    enableParticles: settings.enableParticles,
    enableCursor: settings.enableCursor,
    enableMouseTrail: settings.enableMouseTrail,
    enableFloatingOrbs: settings.enableFloatingOrbs,
    enableScrollProgress: settings.enableScrollProgress,
    enableAnnouncement: settings.enableAnnouncement,
    enableSectionDots: settings.enableSectionDots,
    enableCommandPalette: settings.enableCommandPalette,
    enableKonami: settings.enableKonami,
    announcementText: settings.announcementText,
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
