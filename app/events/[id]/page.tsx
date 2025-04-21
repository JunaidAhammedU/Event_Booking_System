'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  image?: string;
  host: {
    name: string;
  };
  bookings: Array<{
    quantity: number;
  }>;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [params.id]);

  if (!event) {
    return <div className="text-center">Loading...</div>;
  }

  const totalBookedSeats = event.bookings.reduce((acc, booking) => acc + booking.quantity, 0);
  const availableSeats = event.capacity - totalBookedSeats;

  const handleBooking = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
        }),
      });

      if (response.ok) {
        router.push('/my-bookings');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to book tickets');
      }
    } catch (error) {
      alert('Failed to book tickets');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-200">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📅</span>
              {format(new Date(event.date), 'MMMM d, yyyy - h:mm a')}
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📍</span>
              {event.location}
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">👤</span>
              Hosted by {event.host.name}
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">💰</span>
              ${event.price.toFixed(2)} per ticket
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">👥</span>
              {availableSeats} spots remaining
            </div>
          </div>
          <p className="text-gray-600 mb-8">{event.description}</p>
          
          {availableSeats > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-600">Number of tickets:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md px-2 py-1"
                >
                  {[...Array(Math.min(10, availableSeats))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleBooking}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? 'Processing...' : `Book Now - $${(event.price * quantity).toFixed(2)}`}
              </button>
            </div>
          ) : (
            <div className="text-red-600 font-semibold">
              Sorry, this event is sold out!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}