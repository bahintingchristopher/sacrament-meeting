import type { ReactNode } from 'react';
import type { SacramentMeeting } from '@/app/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

interface ProgramRowProps {
  label: string;
  children: ReactNode;
}

function ProgramRow({ label, children }: ProgramRowProps) {
  return (
    <div className="flex flex-col gap-1 py-2.5 border-b border-gray-100 last:border-0 sm:flex-row sm:gap-4 print:break-inside-avoid">
      <dt className="shrink-0 font-medium text-gray-900 sm:w-48">{label}</dt>
      <dd className="text-gray-600">{children}</dd>
    </div>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const meetingTypeLabel =
    meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1);

  return (
    <div className="bg-white shadow rounded-lg border border-gray-200 p-8 max-w-3xl mx-auto print:shadow-none print:border-none print:p-0">
      <div className="text-center border-b border-gray-200 pb-6 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
          {meetingTypeLabel} Meeting Program
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">{formattedDate}</h1>
      </div>

      <dl className="text-gray-800">
        <ProgramRow label="Presiding:">{meeting.presiding}</ProgramRow>

        <ProgramRow label="Conducting:">{meeting.conducting}</ProgramRow>
      </dl>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="my-6 bg-blue-50/50 border border-blue-100 rounded-lg p-4 print:break-inside-avoid">
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-2">
            Ward Announcements:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {meeting.announcements.map((announcement, index) => (
              <li key={`${announcement}-${index}`}>{announcement}</li>
            ))}
          </ul>
        </div>
      )}

      <dl className="text-gray-800">
        <ProgramRow label="Opening Hymn:">
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </ProgramRow>

        <ProgramRow label="Opening Prayer:">{meeting.openingPrayer}</ProgramRow>

        <ProgramRow label="Ward Business:">
          {meeting.wardBusiness && meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <span className="italic text-gray-500">None</span>
          )}
          {meeting.stakeBusiness && (
            <p className="mt-1 text-sm font-medium text-blue-600">Includes Stake Business</p>
          )}
        </ProgramRow>

        <ProgramRow label="Sacrament Hymn:">
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </ProgramRow>

        <ProgramRow label="Administration of the Sacrament:">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-800">Blessed by:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                {meeting.sacramentAdministration.blessedBy.map((name, index) => (
                  <li key={`${name}-${index}`}>{name}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-medium text-gray-800">Passed by:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                {meeting.sacramentAdministration.passedBy.map((name, index) => (
                  <li key={`${name}-${index}`}>{name}</li>
                ))}
              </ol>
            </div>
          </div>
        </ProgramRow>

        <ProgramRow label="Speakers & Musical Numbers:">
          {meeting.speakers.length > 0 ? (
            <div className="space-y-2">
              {meeting.speakers.map((speaker, index) => (
                <div
                  key={`${speaker.name}-${index}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <span className="font-semibold text-gray-800">{speaker.name}</span>
                    {speaker.topic && (
                      <p className="text-xs text-gray-500 mt-0.5">Topic: {speaker.topic}</p>
                    )}
                  </div>
                  <span className="text-xs uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded shrink-0">
                    {speaker.type === 'musical-number' ? 'Musical Number' : 'Speaker'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="italic text-gray-500">None</span>
          )}
        </ProgramRow>

        <ProgramRow label="Closing Hymn:">
          #{meeting.closingHymn.number} — {meeting.closingHymn.title}
        </ProgramRow>

        <ProgramRow label="Closing Prayer:">{meeting.closingPrayer}</ProgramRow>
      </dl>
    </div>
  );
}
