import MeetingCard from '@/app/components/MeetingCard';
import { fetchMeetings } from '@/app/lib/api';

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">All Scheduled Meetings</h3>
        <span className="text-sm text-gray-500">{meetings.length} records found</span>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No meeting records available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}
