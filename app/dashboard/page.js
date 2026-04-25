import { getAllEvents, getPendingEvents, getGoingUsersByEvent } from "@/lib/query";
import Link from "next/link";
import DeleteEventButton from "@/components/dashboard/DeleteEventButton";
import ApproveRejectButtons from "@/components/dashboard/ApproveRejectButtons";
import connectDB from "@/lib/mongodb";

export default async function DashboardPage() {
  await connectDB();
  const events = await getAllEvents();
  const pendingEvents = await getPendingEvents();

  const eventsWithGoingUsers = await Promise.all(
    events.map(async (event) => {
      const goingUsers = await getGoingUsersByEvent(event.id);
      return {
        ...event,
        goingUsers: JSON.parse(JSON.stringify(goingUsers)),
      };
    })
  );
 console.log("eventsWithGoingUsers:", eventsWithGoingUsers);
 
  return (
  <div className="">

  {/* Header */}
  <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
    <h1 className="text-white font-bold text-2xl">Dashboard</h1>
    <Link
      href="/dashboard/create"
      className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md transition-colors text-sm"
    >
      + Create Event
    </Link>
  </div>

  {/* Pending Events */}
  {pendingEvents.length > 0 && (
    <div className="mb-8">
      <h2 className="text-yellow-400 font-semibold text-lg mb-4">
        Pending Events ({pendingEvents.length})
      </h2>
      <div className="space-y-3">
        {pendingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#27292F] rounded-lg p-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3"
          >
            <div className="min-w-0">
              <p className="text-white font-medium truncate">{event.name}</p>
              <p className="text-[#9C9C9C] text-sm truncate">{event.location}</p>
            </div>
            <div className="flex-shrink-0">
              <ApproveRejectButtons eventId={event.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Approved Events */}
  <h2 className="text-white font-semibold text-lg mb-4">
    Approved Events ({eventsWithGoingUsers.length})
  </h2>

  <div className="space-y-4">
    {eventsWithGoingUsers.map((event) => (
      <div
        key={event.id}
        className="bg-[#27292F] rounded-xl border border-[#CCCCCC]/10 overflow-hidden"
      >
        {/* Event Row */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-start gap-3 p-4 border-b border-[#CCCCCC]/10">
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium truncate">{event.name}</p>
            <p className="text-[#9C9C9C] text-sm truncate mt-0.5">{event.location}</p>
            <div className="flex flex-wrap gap-3 mt-1.5">
              <span className="text-[#9C9C9C] text-xs">
                {event.interested_ids?.length ?? 0} Interested
              </span>
              <span className="text-green-400 text-xs">
                {event.goingUsers.length} Going
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href={`/dashboard/edit/${event.id}`}
              className="bg-indigo-600 hover:bg-indigo-800 text-white text-xs px-3 py-1.5 rounded-md transition-colors"
            >
              Edit
            </Link>
            <DeleteEventButton eventId={event.id} />
          </div>
        </div>

        {/* Going Users */}
        {event.goingUsers.length > 0 && (
          <div className="p-4">
            <p className="text-[#9C9C9C] text-xs font-semibold uppercase tracking-widest mb-3">
              Going Users
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {event.goingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 bg-[#1a1a2e] rounded-lg px-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                    <p className="text-[#9C9C9C] text-xs truncate">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}

    {eventsWithGoingUsers.length === 0 && (
      <p className="text-center text-[#9C9C9C] py-12">No approved events.</p>
    )}
  </div>
</div>
  );
}