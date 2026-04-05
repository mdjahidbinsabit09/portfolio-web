import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { personalData } from '@/utils/data/personal-data';

export async function GET() {
  await dbConnect();
  let settings = await Settings.findOne();
  if (!settings || !settings.name) {
    await Settings.deleteMany({});
    settings = await Settings.create({
      name: personalData.name,
      profile: personalData.profile,
      designation: personalData.designation,
      description: personalData.description,
      email: personalData.email,
      phone: personalData.phone,
      address: personalData.address,
      github: personalData.github,
      facebook: personalData.facebook,
      linkedIn: personalData.linkedIn,
      twitter: personalData.twitter,
      stackOverflow: personalData.stackOverflow,
      leetcode: personalData.leetcode,
      devUsername: personalData.devUsername,
      resume: personalData.resume,
      available: personalData.available ?? true,
      siteTitle: `${personalData.name} - Portfolio`,
      siteDescription: personalData.designation,
    });
  }
  return NextResponse.json(settings);
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
