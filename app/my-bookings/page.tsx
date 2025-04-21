'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

interface Booking {
  id: string;
  quantity: number;
  status: string;
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
    image?: string;
  };
}

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/bookings')
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [session]);

  if (!session) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your bookings</h2>
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No bookings found</h2>
        <Link
          href="/events"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex"
          >
            <div className="w-48 h-48 flex-shrink-0 bg-gray-200">
              {booking.event.image ? (
                <img
                  src={booking.event.image}
                  alt={booking.event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {booking.event.title}
              </h3>
              <div className="space-y-2 text-gray-600">
                <div>
                  <span className="mr-2">📅</span>
                  {format(new Date(booking.event.date), 'MMMM d, yyyy - h:mm a')}
                </div>
                <div>
                  <span className="mr-2">📍</span>
                  {booking.event.location}
                </div>
                <div>
                  <span className="mr-2">🎟️</span>
                  {booking.quantity} {booking.quantity === 1 ? 'ticket' : 'tickets'}
                </div>
                <div>
                  <span className="mr-2">💰</span>
                  Total: ${(booking.event.price * booking.quantity).toFixed(2)}
                </div>
                <div>
                  <span className="mr-2">📊</span>
                  Status: <span className="font-semibold">{booking.status}</span>
                </div>
              </div>
              <Link
                href={`/events/${booking.event.id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                View Event Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}