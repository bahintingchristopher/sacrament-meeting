import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NavLinks from '@/app/components/NavLinks';

// Load the Google Font with optimization
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan, review, and print sacrament meeting programs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased`}>
        <Header />
        <Suspense
          fallback={
            <nav
              aria-label="Main navigation"
              className="bg-white border-b border-gray-200 shadow-sm print:hidden"
            >
              <div className="max-w-6xl mx-auto px-4 h-11" />
            </nav>
          }
        >
          <NavLinks />
        </Suspense>
        <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}