import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import { getAllEvents } from "@/lib/actions/event.action";
import Image from "next/image";

export default async function Home() {
  const events = await getAllEvents();
  console.log(events);

  return (
    <section className="container mx-auto">
      <Header />
      <EventList events={events} />
    </section>
  );
}
