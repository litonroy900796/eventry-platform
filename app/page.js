import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import { getAllEvents } from "@/lib/query";

import Image from "next/image";

export default async function Home({ searchParams }) {
const { search } = await searchParams;
  const events = await getAllEvents(search ?? "");

  return (
    <section className="container mx-auto">
      <Header />
      <EventList events={events} />
    </section>
  );
}
