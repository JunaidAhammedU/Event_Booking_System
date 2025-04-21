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
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-48 relative overflow-hidden">
        {image ? (
          <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-4xl">🎉</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              📅
            </span>
            <span className="text-gray-700">{format(new Date(date), 'MMM d, yyyy - h:mm a')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              📍
            </span>
            <span className="text-gray-700">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
              👥
            </span>
            <span className="text-gray-700">{capacity} spots available</span>
          </div>
        </div>
        <Link
          href={`/events/${id}`}
          className="mt-6 block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}