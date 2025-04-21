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
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
          <p className="text-gray-500 font-medium">Loading event details...</p>
        </div>
      </div>
    );
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-72 sm:h-96 relative bg-gradient-to-br from-gray-50 to-gray-100">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">🎉</span>
              </div>
            )}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{event.title}</h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">📅</span>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{format(new Date(event.date), 'MMMM d, yyyy - h:mm a')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">👤</span>
                  <div>
                    <p className="text-sm text-gray-500">Host</p>
                    <p className="font-medium">{event.host.name}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per ticket</span>
                  <span className="text-2xl font-bold text-gray-900">${event.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available seats</span>
                  <span className="text-lg font-semibold text-gray-900">{availableSeats}</span>
                </div>
                
                {availableSeats > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <label className="text-gray-600 font-medium">Quantity:</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-blue-600 focus:border-transparent"
                      >
                        {[...Array(Math.min(10, availableSeats))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleBooking}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium disabled:from-gray-400 disabled:to-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                          Processing...
                        </span>
                      ) : (
                        `Book Now - $${(event.price * quantity).toFixed(2)}`
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold text-center p-4 bg-red-50 rounded-lg">
                    Sorry, this event is sold out!
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}