'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

interface DeleteMeetingButtonProps {
  action: () => Promise<void>;
  meetingId: string;
  meetingLabel: string;
}

export default function DeleteMeetingButton({
  action,
  meetingId,
  meetingLabel,
}: DeleteMeetingButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleConfirm() {
    setError(null);

    startTransition(async () => {
      try {
        await action();
        setIsOpen(false);
      } catch {
        setError('Could not delete the meeting. Please try again.');
      }
    });
  }

  const titleId = `delete-meeting-${meetingId}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-white border border-red-300 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
      >
        Delete
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            setIsOpen(false);
          }
        }}
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-gray-200 p-0 shadow-xl backdrop:bg-black/50"
      >
        <div className="p-6 text-left">
          <h2 id={titleId} className="text-lg font-bold text-gray-900">
            Delete meeting?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete the meeting on {meetingLabel}? This cannot be undone.
          </p>

          {error && (
            <p className="mt-3 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              autoFocus
              disabled={isPending}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {isPending ? 'Deleting...' : 'Delete meeting'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
