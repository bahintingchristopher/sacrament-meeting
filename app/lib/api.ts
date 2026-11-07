import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

async function getBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  }

  const protocol =
    requestHeaders.get('x-forwarded-proto') ??
    (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');

  return `${protocol}://${host}`;
}

export async function fetchMeetings(date?: string): Promise<SacramentMeeting[]> {
  const baseUrl = await getBaseUrl();
  const url = new URL('/api/meetings', baseUrl);

  if (date) {
    url.searchParams.set('date', date);
  }

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch meetings: ${response.status}`);
  }

  return (await response.json()) as SacramentMeeting[];
}

export async function fetchMeetingById(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch meeting ${id}: ${response.status}`);
  }

  return (await response.json()) as SacramentMeeting;
}
