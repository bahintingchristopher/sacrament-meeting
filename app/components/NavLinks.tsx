'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useState, type ReactNode } from 'react';

interface NavLinksProps {
  authSlot?: ReactNode;
}

export default function NavLinks({ authSlot }: NavLinksProps) {
  const pathname = usePathname();
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: "Today's Program", href: '/meetings/current' },
    { name: 'New Meeting', href: '/meetings/new' },
  ];

  function desktopLinkClass(href: string) {
    return `py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
      pathname === href
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
    }`;
  }

  function mobileLinkClass(href: string) {
    return `block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
      pathname === href
        ? 'bg-blue-50 text-blue-700'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
    }`;
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav
      aria-label="Main navigation"
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between sm:pr-48">
          <div className="hidden sm:flex sm:items-center sm:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={desktopLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 transition-colors hover:bg-gray-50 sm:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          id={menuId}
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200 py-3 sm:absolute sm:right-4 sm:top-0 sm:block sm:h-14 sm:border-0 sm:py-0`}
        >
          <div className="flex flex-col gap-1 sm:hidden">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={mobileLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-gray-100 pt-3 sm:mt-0 sm:flex sm:h-full sm:items-center sm:border-0 sm:pt-0">
            {authSlot}
          </div>
        </div>
      </div>
    </nav>
  );
}
