import { requireLeaderSession } from '@/app/lib/dal';

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const leader = await requireLeaderSession();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Leader Tools</h1>
        <p className="text-sm text-gray-600 mt-1">
          Signed in as {leader.name}. Create and manage sacrament meeting programs.
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
