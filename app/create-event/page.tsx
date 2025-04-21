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
    } catch (error:any) {
      alert(error.message || 'An error occurred while creating the event');
    }
  };

  if (!session) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Please log in to create an event
        </h2>
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <input
            type="datetime-local"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            {...register('capacity', { valueAsNumber: true })}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL (optional)
          </label>
          <input
            type="url"
            {...register('image')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}