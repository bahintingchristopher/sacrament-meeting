'use client';

import { useActionState } from 'react';
import { updateMeeting, type State } from '@/app/lib/actions';
import type { SacramentMeeting } from '@/app/lib/types';

const meetingTypes = ['testimony', 'regular', 'stake', 'general', 'special'];
const blessFields = ['blessBy1', 'blessBy2'] as const;
const passFields = ['passBy1', 'passBy2', 'passBy3', 'passBy4'] as const;

const initialState: State = { message: null, errors: {} };

export default function EditMeetingForm({
  id,
  meeting,
}: {
  id: string;
  meeting: SacramentMeeting;
}) {
  const [state, formAction, isPending] = useActionState(
    updateMeeting.bind(null, id),
    initialState
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Meeting</h2>
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            aria-describedby="date-error"
            required
            defaultValue={meeting.date}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="date-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.date?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            aria-describedby="meetingType-error"
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
          <div id="meetingType-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.meetingType?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-gray-700 mb-1">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            aria-describedby="presiding-error"
            required
            defaultValue={meeting.presiding}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.presiding?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-gray-700 mb-1">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            aria-describedby="conducting-error"
            required
            defaultValue={meeting.conducting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.conducting?.map((error) => <p key={error}>{error}</p>)}
          </div>
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
            aria-describedby="openingHymnNumber-error"
            required
            defaultValue={meeting.openingHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnNumber?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            aria-describedby="openingHymnTitle-error"
            required
            defaultValue={meeting.openingHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnTitle?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700 mb-1">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            aria-describedby="openingPrayer-error"
            required
            defaultValue={meeting.openingPrayer}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.openingPrayer?.map((error) => <p key={error}>{error}</p>)}
          </div>
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
            aria-describedby="sacramentHymnNumber-error"
            required
            defaultValue={meeting.sacramentHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnNumber?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            aria-describedby="sacramentHymnTitle-error"
            required
            defaultValue={meeting.sacramentHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnTitle?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <fieldset className="md:col-span-2 border border-gray-200 rounded-lg p-4">
          <legend className="px-1 text-sm font-semibold text-gray-800">
            Administration of the Sacrament
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Bless by</p>
              {blessFields.map((name, index) => (
                <div key={name} className="mb-2">
                  <label htmlFor={name} className="block text-xs text-gray-600 mb-1">
                    {index + 1}.
                  </label>
                  <input
                    id={name}
                    name={name}
                    aria-describedby={`${name}-error`}
                    defaultValue={meeting.sacramentAdministration?.blessedBy[index] ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <div id={`${name}-error`} aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
                    {state.errors?.[name]?.map((error) => <p key={error}>{error}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Pass by</p>
              {passFields.map((name, index) => (
                <div key={name} className="mb-2">
                  <label htmlFor={name} className="block text-xs text-gray-600 mb-1">
                    {index + 1}.
                  </label>
                  <input
                    id={name}
                    name={name}
                    aria-describedby={`${name}-error`}
                    defaultValue={meeting.sacramentAdministration?.passedBy[index] ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <div id={`${name}-error`} aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
                    {state.errors?.[name]?.map((error) => <p key={error}>{error}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <div>
          <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min="1"
            aria-describedby="closingHymnNumber-error"
            required
            defaultValue={meeting.closingHymn.number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnNumber?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            aria-describedby="closingHymnTitle-error"
            required
            defaultValue={meeting.closingHymn.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnTitle?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="announcements" className="block text-sm font-medium text-gray-700 mb-1">
            Announcements (one per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            aria-describedby="announcements-error"
            defaultValue={(meeting.announcements ?? []).join('\n')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="announcements-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.announcements?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-700 mb-1">
            Ward Business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            aria-describedby="wardBusiness-error wardBusiness-hint"
            defaultValue={(meeting.wardBusiness ?? [])
              .map((item) => item.description)
              .join('\n')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <p id="wardBusiness-hint" className="mt-1 text-xs text-gray-500">One item per line</p>
          <div id="wardBusiness-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.wardBusiness?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="speakers" className="block text-sm font-medium text-gray-700 mb-1">
            Speakers
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={3}
            aria-describedby="speakers-error speakers-hint"
            defaultValue={(meeting.speakers ?? [])
              .map((speaker) => [speaker.name, speaker.topic].filter(Boolean).join(' | '))
              .join('\n')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <p id="speakers-hint" className="mt-1 text-xs text-gray-500">
            One speaker per line: Name | Topic
          </p>
          <div id="speakers-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.speakers?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            value="on"
            aria-describedby="stakeBusiness-error"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-700">
            Stake Business
          </label>
          <div id="stakeBusiness-error" aria-live="polite" aria-atomic="true" className="text-sm text-red-600">
            {state.errors?.stakeBusiness?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700 mb-1">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            aria-describedby="closingPrayer-error"
            required
            defaultValue={meeting.closingPrayer}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
            {state.errors?.closingPrayer?.map((error) => <p key={error}>{error}</p>)}
          </div>
        </div>

        {state.message ? (
          <p className="text-sm text-red-600 md:col-span-2">{state.message}</p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving...' : 'Update Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
}
