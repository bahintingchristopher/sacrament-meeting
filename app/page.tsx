import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
            WDD430 Project
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Sacrament Meeting Planner
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Helping bishoprics and branch leaders organize agendas, manage speakers, track hymns, and allow ward members to view or print current and past programs with ease.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              View All Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              This Week&apos;s Program
            </Link>
          </div>
        </div>

        {/* Hero Image using local public asset */}
        <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center">
          <Image
            src="/images/meetinghouse.png"
            alt="Local ward meetinghouse"
            width={600}
            height={400}
            priority
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Typed Agendas</h3>
          <p className="text-sm text-gray-600">
            Robust data models tracking hymns, prayers, ward business, and speaker assignments cleanly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Automated Sunday Routing</h3>
          <p className="text-sm text-gray-600">
            Dynamic date calculations automatically redirect members to the current week&apos;s sacrament program.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-2">Print-Ready Programs</h3>
          <p className="text-sm text-gray-600">
            Clean print views stripped of navigation elements, ready for distribution at the chapel door.
          </p>
        </div>
      </div>
    </div>
  );
}