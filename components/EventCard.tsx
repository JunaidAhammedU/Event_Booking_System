'use client';

import { format } from 'date-fns';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  capacity: number;
  image?: string;
}

export function EventCard({ id, title, description, date, location, price, capacity, image }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div>📅 {format(new Date(date), 'MMM d, yyyy - h:mm a')}</div>
          <div>📍 {location}</div>
          <div>💰 ${price.toFixed(2)}</div>
          <div>👥 {capacity} spots available</div>
        </div>
        <Link
          href={`/events/${id}`}
          className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}