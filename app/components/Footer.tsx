import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto no-print">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        <p>Sacrament Meeting Planner • WDD430 Assignment</p>
        <p className="mt-1 text-gray-600 font-medium">
          Developed by Christopher Bahinting • Built with Next.js App Router, TypeScript, & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}