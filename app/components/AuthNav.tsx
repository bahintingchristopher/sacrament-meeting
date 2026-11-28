import Link from 'next/link';
import { connection } from 'next/server';
import { auth } from '@/auth';
import NavLinks from '@/app/components/NavLinks';
import SignOutButton from '@/app/components/SignOutButton';

export default async function AuthNav() {
  await connection();
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const authSlot = isAuthenticated ? (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="text-sm text-gray-600">
        Signed in as{' '}
        <span className="font-semibold text-gray-900">
          {session?.user?.name ?? session?.user?.email}
        </span>
      </span>
      <SignOutButton />
    </div>
  ) : (
    <Link
      href="/login"
      className="py-3 px-1 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
    >
      Sign In
    </Link>
  );

  return <NavLinks isAuthenticated={isAuthenticated} authSlot={authSlot} />;
}
