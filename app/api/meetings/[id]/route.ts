import { NextResponse } from 'next/server';
import { getMeetingById } from '@/app/lib/meetings-db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const numericId = Number(id);

  // Return 400 Bad Request if ID is not a valid positive integer
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json(
      { error: 'Invalid meeting ID format. Must be a number.' },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(numericId);

  // Return 404 Not Found if meeting does not exist
  if (!meeting) {
    return NextResponse.json(
      { error: `Meeting with ID ${numericId} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}