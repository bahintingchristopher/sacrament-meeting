import Link from 'next/link';
import type { SacramentMeeting } from '@/app/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
            {meeting.meetingType}
          </span>
          <span className="text-sm text-gray-500 font-medium">{formattedDate}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Sacrament Meeting
        </h3>
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p><span className="font-medium text-gray-700">Presiding:</span> {meeting.presiding}</p>
          <p><span className="font-medium text-gray-700">Conducting:</span> {meeting.conducting}</p>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex items-center bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-colors cursor-pointer space-x-3"
        >
          <span className="text-lg tracking-wider">GO</span>
          <div className="flex items-center -space-x-1.5">
            <svg
              className="w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}