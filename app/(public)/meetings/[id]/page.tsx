import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/app/components/MeetingDetail';
import PrintButton from '@/app/components/PrintButton';
import { fetchMeetingById } from '@/app/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface MeetingContentProps {
  params: Promise<{ id: string }>;
}

async function MeetingContent({ params }: MeetingContentProps) {
  const { id } = await params;
  const meeting = await fetchMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}

function MeetingProgramSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading meeting program"
      className="max-w-3xl mx-auto bg-white shadow rounded-lg border border-gray-200 p-8 animate-pulse"
    >
      <div className="h-7 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}

export default function MeetingDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <Link
          href="/meetings"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow transition-colors"
        >
          <span aria-hidden="true" className="flex items-center -space-x-1.5">
            <svg
              className="w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <span>BACK TO ALL</span>
        </Link>
        <PrintButton />
      </div>

      <Suspense fallback={<MeetingProgramSkeleton />}>
        <MeetingContent params={params} />
      </Suspense>
    </div>
  );
}
