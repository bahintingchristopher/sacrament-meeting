import { notFound } from 'next/navigation';
import { updateMeeting } from '@/app/lib/actions';
import { getMeetingById } from '@/app/lib/meetings-db';

export const instant = false;

const meetingTypes = ['testimony', 'regular', 'stake', 'general', 'special'];

export default async function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Meeting</h2>
      <form
        action={updateMeeting.bind(null, id)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={meeting.date}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            required
            defaultValue={meeting.meetingType}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {meetingTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-gray-700 mb-1">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            required
            defaultValue={meeting.presiding}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-gray-700 mb-1">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            required
            defaultValue={meeting.conducting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting.openingHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            required
            defaultValue={meeting.openingHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            required
            defaultValue={meeting.openingPrayer}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting.sacramentHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            required
            defaultValue={meeting.sacramentHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            required
            defaultValue={meeting.closingHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            required
            defaultValue={meeting.closingHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="announcements" className="block text-sm font-medium text-gray-700 mb-1">
            Announcements (one per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={(meeting.announcements ?? []).join('\n')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-700 mb-1">
            Ward Business (JSON array)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={JSON.stringify(meeting.wardBusiness ?? [])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div>
          <label htmlFor="speakers" className="block text-sm font-medium text-gray-700 mb-1">
            Speakers (JSON array)
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={3}
            defaultValue={JSON.stringify(meeting.speakers ?? [])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            value="on"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-700">
            Stake Business
          </label>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            required
            defaultValue={meeting.closingPrayer}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Meeting
          </button>
        </div>
      </form>
    </div>
  );
}
