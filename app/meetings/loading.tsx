export default function MeetingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-gray-100 rounded-lg border border-gray-200"></div>
        <div className="h-48 bg-gray-100 rounded-lg border border-gray-200"></div>
      </div>
    </div>
  );
}