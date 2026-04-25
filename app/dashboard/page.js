import { getAllEvents, getPendingEvents } from "@/lib/query";
import Link from "next/link";
import DeleteEventButton from "@/components/dashboard/DeleteEventButton";
import ApproveRejectButtons from "@/components/dashboard/ApproveRejectButtons";

export default async function DashboardPage() {
  const events = await getAllEvents();
  const pendingEvents = await getPendingEvents();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white font-bold text-2xl">Dashboard</h1>
        <Link
          href="/dashboard/create"
          className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-md transition-colors"
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
                className="bg-[#27292F] rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-medium">{event.name}</p>
                  <p className="text-[#9C9C9C] text-sm">{event.location}</p>
                </div>
                <ApproveRejectButtons eventId={event.id} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Events */}
      <h2 className="text-white font-semibold text-lg mb-4">
        Approved Events ({events.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#CCCCCC]/20 text-[#9C9C9C]">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Interested</th>
              <th className="text-left py-3 px-4">Going</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-[#CCCCCC]/10 hover:bg-[#27292F] transition-colors"
              >
                <td className="py-3 px-4 text-white font-medium">{event.name}</td>
                <td className="py-3 px-4 text-[#9C9C9C]">{event.location}</td>
                <td className="py-3 px-4 text-[#9C9C9C]">{event.interested_ids?.length ?? 0}</td>
                <td className="py-3 px-4 text-[#9C9C9C]">{event.going_ids?.length ?? 0}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/edit/${event.id}`}
                      className="bg-indigo-600 hover:bg-indigo-800 text-white text-xs px-3 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteEventButton eventId={event.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <p className="text-center text-[#9C9C9C] py-12">No approved events.</p>
        )}
      </div>
    </div>
  );
}