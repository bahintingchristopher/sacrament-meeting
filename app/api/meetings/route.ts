import { NextResponse } from 'next/server';
import { getMeetings } from '@/app/lib/meetings-db';

export async function GET() {
  const meetings = await getMeetings();
  return NextResponse.json(meetings);
}