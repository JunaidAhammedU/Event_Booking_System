import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'asc'
    },
    include: {
      host: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Events Found</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            Looks like there aren't any events scheduled yet. Check back later or be the first to host an event!
          </p>
          <a
            href="/create-event"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">✨</span>
            Create an Event
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event:any) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              price={event.price}
              capacity={event.capacity}
              image={event.image || undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}