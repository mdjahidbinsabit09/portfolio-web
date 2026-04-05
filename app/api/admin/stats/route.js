import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Stat from '@/models/Stat';
import { statsData } from '@/utils/data/stats-data';

export async function GET() {
  await dbConnect();
  const count = await Stat.countDocuments();
  if (count === 0) {
    await Stat.insertMany(
      statsData.map((s, i) => ({
        label: s.label, value: s.value, suffix: s.suffix, order: i,
      }))
    );
  }
  const stats = await Stat.find().sort({ order: 1 });
  return NextResponse.json(stats);
}

export async function PUT(request) {
  await dbConnect();
  const { stats } = await request.json();
  await Stat.deleteMany({});
  const docs = stats.map((s, i) => ({ ...s, order: i }));
  const created = await Stat.insertMany(docs);
  return NextResponse.json(created);
}
