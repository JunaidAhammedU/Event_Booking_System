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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
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
    </div>
  );
}