import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="w-full relative h-[500px] mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-5xl">🌎</span>
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
                EventBook
              </h1>
            </div>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-100 mt-6">
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
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">🔍</span>
            <span className="font-medium">Browse Events</span>
          </Link>
          <Link
            href="/create-event"
            className="group flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">✨</span>
            <span className="font-medium">Host an Event</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
