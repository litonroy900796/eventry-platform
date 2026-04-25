import { auth } from "@/auth";
import { getUserEvents, getGoingUsersByEvent } from "@/lib/query";
import { redirect } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import UserEventDeleteButton from "@/components/events/UserEventDeleteButton";

export default async function MyEventsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const events = await getUserEvents(session.user.id);
  const serializedEvents = JSON.parse(JSON.stringify(events));

  const eventsWithGoingUsers = await Promise.all(
    serializedEvents.map(async (event) => {
      const goingUsers = await getGoingUsersByEvent(event.id);
      return {
        ...event,
        goingUsers: JSON.parse(JSON.stringify(goingUsers)),
      };
    })
  );

  const statusColor = {
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    approved: "text-green-400 bg-green-400/10 border-green-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <section className="container md:my-6 my-3">

  {/* Header */}
  <div className="flex flex-wrap justify-between items-start gap-3 mb-8">
    <div>
      <h1 className="text-white font-bold text-2xl">My Events</h1>
      <p className="text-[#9C9C9C] text-sm mt-1">Manage your submitted events</p>
    </div>
    <Link
      href="/my-events/create"
      className="bg-indigo-600 hover:bg-indigo-700 active:scale-[.99] text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shrink-0"
    >
      + Submit Event
    </Link>
  </div>

  {eventsWithGoingUsers.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-[#27292F] rounded-full flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-[#6b6b8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-white font-semibold text-lg">No events yet</h3>
      <p className="text-[#9C9C9C] text-sm mt-1 mb-5">You have not submitted any events yet.</p>
      <Link
        href="/my-events/create"
        className="bg-indigo-600 hover:bg-indigo-700 active:scale-[.99] text-white px-6 py-2 rounded-lg transition-all text-sm"
      >
        Submit your first event
      </Link>
    </div>
  ) : (
    <div className="space-y-5">
      {eventsWithGoingUsers.map((event) => (
        <div
          key={event.id}
          className="bg-[#242526] rounded-xl border border-[#CCCCCC]/10 overflow-hidden"
        >
          {/* Event Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 sm:p-5 border-b border-[#CCCCCC]/10">
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-base sm:text-lg truncate">
                {event.name}
              </h2>
              <p className="text-[#9C9C9C] text-sm mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="truncate">{event.location}</span>
              </p>

              {/* Rejection reason */}
              {event.status === "rejected" && event.rejectionReason && (
                <div className="mt-2.5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <p className="text-red-400 text-xs">
                    <strong>Rejection Reason:</strong> {event.rejectionReason}
                  </p>
                </div>
              )}

              {/* Status notes */}
              {event.status === "approved" && (
                <p className="text-green-400/70 text-xs mt-2">
                  Editing this event will keep it approved automatically.
                </p>
              )}
              {event.status === "rejected" && (
                <p className="text-yellow-400/70 text-xs mt-1.5">
                  Editing this event will send it for re-review.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[event.status]}`}>
                {event.status.toUpperCase()}
              </span>
              <Link
                href={`/my-events/edit/${event.id}`}
                className="text-xs bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20 text-indigo-400 px-3 py-1.5 rounded-md transition-colors"
              >
                Edit
              </Link>
              {event.status !== "approved" && (
                <UserEventDeleteButton eventId={event.id} />
              )}
            </div>
          </div>

          {/* Going Users */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white font-medium text-sm">
                Going ({event.goingUsers.length})
              </p>
            </div>

            {event.goingUsers.length === 0 ? (
              <p className="text-[#6b6b8a] text-sm">No one is going yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {event.goingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 bg-[#27292F] rounded-lg px-3 py-2.5"
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
            )}
          </div>
        </div>
      ))}
    </div>
  )}

</section>
  );
}