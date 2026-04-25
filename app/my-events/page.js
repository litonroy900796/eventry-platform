import { auth } from "@/auth";
import { getUserEvents } from "@/lib/query";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyEventsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const events = await getUserEvents(session.user.id);
  const serializedEvents = JSON.parse(JSON.stringify(events));

  const statusColor = {
    pending: "text-yellow-400 bg-yellow-400/10",
    approved: "text-green-400 bg-green-400/10",
    rejected: "text-red-400 bg-red-400/10",
  };

  return (
    <section className="container my-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white font-bold text-2xl">My Events</h1>
        <Link
          href="/my-events/create"
          className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md transition-colors"
        >
          + Submit Event
        </Link>
      </div>

      {serializedEvents.length === 0 ? (
        <p className="text-[#9C9C9C]">You have not submitted any events yet.</p>
      ) : (
        <div className="space-y-4">
          {serializedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#242526] rounded-lg p-5 flex justify-between items-start"
            >
              <div>
                <h2 className="text-white font-semibold text-lg">{event.name}</h2>
                <p className="text-[#9C9C9C] text-sm">{event.location}</p>
                {event.status === "rejected" && event.rejectionReason && (
                  <p className="text-red-400 text-sm mt-2">
                    Reason: {event.rejectionReason}
                  </p>
                )}
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[event.status]}`}>
                {event.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}