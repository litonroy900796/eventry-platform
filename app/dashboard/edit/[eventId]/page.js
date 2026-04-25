import EditEventForm from "@/components/dashboard/EditEventForm";
import SwagForm from "@/components/dashboard/SwagForm";
import { getEventById } from "@/lib/query";

export default async function EditEventPage({ params }) {
  const { eventId } = await params;
  const event = await getEventById(eventId);
  const serializedEvent = JSON.parse(JSON.stringify(event));

  return (
    <div>
      <h1 className="text-white font-bold text-2xl mb-6">Edit Event</h1>
      <EditEventForm event={serializedEvent} />
       <SwagForm event={serializedEvent} />
    </div>
  );
}