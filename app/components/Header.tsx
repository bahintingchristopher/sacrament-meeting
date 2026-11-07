import Link from 'next/link';
import { connection } from 'next/server';
import { Suspense } from 'react';

async function CurrentDate() {
  await connection();

  const now = new Date();
  const formatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  return <time dateTime={now.toISOString()}>{formatted}</time>;
}

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors"
        >
          Lapu-lapu 3rd Ward
        </Link>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Today:</span>{' '}
          <Suspense fallback={<span>Loading date&hellip;</span>}>
            <CurrentDate />
          </Suspense>
        </p>
      </div>
    </header>
  );
}
