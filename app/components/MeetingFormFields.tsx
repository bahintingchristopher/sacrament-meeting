import type { State } from '@/app/lib/actions';
import type { SacramentMeeting } from '@/app/lib/types';

const meetingTypes = ['testimony', 'regular', 'stake', 'general', 'special'];
const blessFields = ['blessBy1', 'blessBy2'] as const;
const passFields = ['passBy1', 'passBy2', 'passBy3', 'passBy4'] as const;

interface MeetingFormFieldsProps {
  state: State;
  meeting?: SacramentMeeting;
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="mt-1 text-sm text-red-600">
      {errors?.map((error) => <p key={error}>{error}</p>)}
    </div>
  );
}

export default function MeetingFormFields({ state, meeting }: MeetingFormFieldsProps) {
  const administration = meeting?.sacramentAdministration;
  const announcements = (meeting?.announcements ?? []).join('\n');
  const wardBusiness = (meeting?.wardBusiness ?? [])
    .map((item) => item.description)
    .join('\n');
  const speakers = (meeting?.speakers ?? [])
    .map((speaker) => [speaker.name, speaker.topic].filter(Boolean).join(' | '))
    .join('\n');

  return (
    <>
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
          defaultValue={meeting?.date ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="date-error" errors={state.errors?.date} />
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
          defaultValue={meeting?.meetingType ?? 'testimony'}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          {meetingTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
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
          defaultValue={meeting?.presiding ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="presiding-error" errors={state.errors?.presiding} />
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
          defaultValue={meeting?.conducting ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="conducting-error" errors={state.errors?.conducting} />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="announcements" className="block text-sm font-medium text-gray-700 mb-1">
          Announcement (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          aria-describedby="announcements-error"
          defaultValue={announcements}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="announcements-error" errors={state.errors?.announcements} />
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
          defaultValue={meeting?.openingHymn.number ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="openingHymnNumber-error" errors={state.errors?.openingHymnNumber} />
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
          defaultValue={meeting?.openingHymn.title ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="openingHymnTitle-error" errors={state.errors?.openingHymnTitle} />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-700 mb-1">
          Ward Business
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          placeholder={'Bishopric announcement\nYoung Women activity'}
          aria-describedby="wardBusiness-error wardBusiness-hint"
          defaultValue={wardBusiness}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <p id="wardBusiness-hint" className="mt-1 text-xs text-gray-500">One item per line</p>
        <FieldError id="wardBusiness-error" errors={state.errors?.wardBusiness} />
      </div>

      <div className="flex items-center gap-2 md:col-span-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          value="on"
          aria-describedby="stakeBusiness-error"
          defaultChecked={meeting?.stakeBusiness ?? false}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-700">
          Stake Business
        </label>
        <div id="stakeBusiness-error" className="text-sm text-red-600">
          {state.errors?.stakeBusiness?.map((error) => <p key={error}>{error}</p>)}
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
          defaultValue={meeting?.openingPrayer ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />
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
          defaultValue={meeting?.sacramentHymn.number ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="sacramentHymnNumber-error" errors={state.errors?.sacramentHymnNumber} />
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
          defaultValue={meeting?.sacramentHymn.title ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="sacramentHymnTitle-error" errors={state.errors?.sacramentHymnTitle} />
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
                  defaultValue={administration?.blessedBy[index] ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <FieldError id={`${name}-error`} errors={state.errors?.[name]} />
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
                  defaultValue={administration?.passedBy[index] ?? ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <FieldError id={`${name}-error`} errors={state.errors?.[name]} />
              </div>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="md:col-span-2">
        <label htmlFor="speakers" className="block text-sm font-medium text-gray-700 mb-1">
          Speakers
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={3}
          placeholder={'Brother Velasco | Conversion\nSister Cabrera | Endurance'}
          aria-describedby="speakers-error speakers-hint"
          defaultValue={speakers}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <p id="speakers-hint" className="mt-1 text-xs text-gray-500">
          One speaker per line: Name | Topic
        </p>
        <FieldError id="speakers-error" errors={state.errors?.speakers} />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="concludingSpeaker" className="block text-sm font-medium text-gray-700 mb-1">
          Concluding Speaker
        </label>
        <input
          id="concludingSpeaker"
          name="concludingSpeaker"
          aria-describedby="concludingSpeaker-error"
          defaultValue={meeting?.concludingSpeaker ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="concludingSpeaker-error" errors={state.errors?.concludingSpeaker} />
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
          aria-describedby="closingHymnNumber-error"
          required
          defaultValue={meeting?.closingHymn.number ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="closingHymnNumber-error" errors={state.errors?.closingHymnNumber} />
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
          defaultValue={meeting?.closingHymn.title ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="closingHymnTitle-error" errors={state.errors?.closingHymnTitle} />
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
          defaultValue={meeting?.closingPrayer ?? ''}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
      </div>
    </>
  );
}
