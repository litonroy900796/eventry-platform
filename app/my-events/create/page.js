import { auth } from "@/auth";
import UserCreateEventForm from "@/components/events/UserCreateEventForm";
import { redirect } from "next/navigation";

export default async function UserCreateEventPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <section className="container my-6 md:my-8 lg:my-12">
      <div className="bg-[#242526] p-5 sm:p-6 rounded-lg w-full max-w-2xl mx-auto">
        <h1 className="text-white font-bold text-2xl mb-1.5">
          Submit an Event
        </h1>
        <p className="text-[#9C9C9C] text-sm mb-6">
          Your event will be reviewed by our admin team before being published.
        </p>
        <UserCreateEventForm />
      </div>
    </section>
  );
}
