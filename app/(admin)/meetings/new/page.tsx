'use client';

import { useActionState } from 'react';
import MeetingFormFields from '@/app/components/MeetingFormFields';
import { createMeeting, type State } from '@/app/lib/actions';

const initialState: State = { message: null, errors: {} };

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Create Meeting</h2>
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MeetingFormFields state={state} />

        {state.message ? (
          <p className="text-sm text-red-600 md:col-span-2">{state.message}</p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving...' : 'Create Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
}
