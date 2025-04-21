import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      {/* Hero Image Section */}
      <div className="w-full relative h-[500px] mb-12">
        <Image
          src="/events-hero.jpg"
          alt="Events and celebrations"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image src="/globe.svg" alt="Globe" width={40} height={40} className="animate-pulse invert" />
              <h1 className="text-5xl font-bold">EventBook</h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-100">
              Discover and book amazing events happening near you. From conferences to concerts,
              find your next unforgettable experience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl px-4 space-y-12">
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/events"
            className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Image src="/window.svg" alt="Browse" width={24} height={24} className="invert" />
            <span>Browse Events</span>
          </Link>
          <Link
            href="/create-event"
            className="group flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-lg hover:shadow-xl"
          >
            <Image src="/file.svg" alt="Host" width={24} height={24} />
            <span>Host an Event</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
