import React from 'react';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ward Sacrament Meetings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Browse, review, and print current and historical sacrament meeting programs.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}