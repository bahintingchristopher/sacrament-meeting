import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/app/components/LoginForm';

export const metadata: Metadata = {
  title: 'Bishopric Sign In',
  description: 'Sign in to manage the sacrament meeting schedule and program details.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900">Leader Sign In</h1>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          Sign in with your bishopric, clerk, or executive secretary account to manage meeting programs.
        </p>
        <LoginForm />
        <p className="mt-6 text-sm text-gray-500">
          <Link href="/" className="text-blue-700 hover:underline">
            Return to the home page
          </Link>
        </p>
      </div>
    </div>
  );
}
