import React, { Suspense } from 'react';
import { connection } from 'next/server';

async function CurrentYear() {
  await connection();

  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto no-print">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        <p>Sacrament Meeting Planner • WDD430 Assignment</p>
        <p className="mt-1 text-gray-600 font-medium">
          &copy; <Suspense fallback={<span>&hellip;</span>}><CurrentYear /></Suspense> | Christopher Bahinting
        </p>
        <p className="mt-1">
          Built with Next.js App Router, TypeScript, &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}