import { auth } from "@/auth";
import UserEditEventForm from "@/components/events/UserEditEventForm";
import { getEventById } from "@/lib/query";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";

export default async function UserEditEventPage({ params }) {
  const { eventId } = await params;
  console.log("eventId:", eventId);
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const event = await getEventById(eventId);
  console.log("event:", event);
  const serializedEvent = JSON.parse(JSON.stringify(event));

  // owner check
  if (serializedEvent.createdBy?.toString() !== session.user.id) {
    redirect("/my-events");
  }

  // approved event edit করা যাবে না
  if (serializedEvent.status === "approved") {
    // approved হলেও edit করতে দেব — auto approved হবে
  }

  return (
    <section className="container my-6 md:my-8 lg:my-12">
      <div className="bg-[#242526] p-5 sm:p-6 rounded-lg w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <h1 className="text-white font-bold text-2xl">Edit Event</h1>
          {serializedEvent.status === "approved" && (
            <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full">
              Changes will be auto-approved
            </span>
          )}
          {serializedEvent.status === "rejected" && (
            <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full">
              Will go for re-review
            </span>
          )}
        </div>
        <UserEditEventForm event={serializedEvent} />
      </div>
    </section>
  );
}
