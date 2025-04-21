'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              EventBook
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            {session ? (
              <>
                <Link href="/my-bookings" className="text-gray-600 hover:text-gray-900">
                  My Bookings
                </Link>
                <Link href="/create-event" className="text-gray-600 hover:text-gray-900">
                  Create Event
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}