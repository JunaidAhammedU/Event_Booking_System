'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Event date must be in the future',
  }),
  location: z.string().min(3, 'Location must be at least 3 characters long'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price cannot be negative'),
  image: z.string().url('Must be a valid URL').optional(),
});

type EventForm = z.infer<typeof eventSchema>;

export default function CreateEventPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventForm) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const event = await response.json();
        router.push(`/events/${event.id}`);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error: any) {
      alert(error.message || 'An error occurred while creating the event');
    }
  };

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <span className="text-5xl mb-4 block">🔐</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to create an event
          </h2>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-3xl">✨</span>
              <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
            </div>
            <p className="mt-2 text-gray-600">Fill in the details below to create your amazing event.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Give your event a catchy title"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Where will it take place?"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Describe your event in detail"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date and Time</label>
              <input
                type="datetime-local"
                {...register('date')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  {...register('capacity', { valueAsNumber: true })}
                  min="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="How many people can attend?"
                />
                {errors.capacity && (
                  <p className="mt-2 text-sm text-red-600">{errors.capacity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Set a price for your event"
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
              <input
                type="url"
                {...register('image')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Provide an image URL for your event"
              />
              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 font-medium text-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  'Create Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}