import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Leader Tools</h1>
        <p className="text-sm text-gray-600 mt-1">
          Create and manage sacrament meeting programs. Authentication coming in Week 05.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
