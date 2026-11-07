import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/app/components/MeetingDetail';
import PrintButton from '@/app/components/PrintButton';
import { fetchMeetingById } from '@/app/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const meeting = await fetchMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <Link
          href="/meetings"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          &larr; Back to All Meetings
        </Link>
        <PrintButton />
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
