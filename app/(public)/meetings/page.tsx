import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/app/lib/meetings-db';
import MeetingSearch from '@/app/components/MeetingSearch';
import MeetingCard from '@/app/components/MeetingCard';
import Pagination from '@/app/components/Pagination';
import { getLeaderSession } from '@/app/lib/dal';

export const instant = false;

export const metadata: Metadata = {
  title: 'Meeting Schedule',
  description: 'Browse upcoming and past sacrament meeting schedules and programs.',
  openGraph: {
    title: 'Meeting Schedule',
    description: 'Browse upcoming and past sacrament meeting schedules and programs.',
    images: ['/opengraph-image.jpg'],
  },
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages, leader] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
    getLeaderSession(),
  ]);

  const canManage = !!leader;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <MeetingSearch />
        <span className="text-sm text-gray-500">{meetings.length} records found</span>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No meeting records available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} canManage={canManage} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
