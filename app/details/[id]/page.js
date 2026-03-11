import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/lib/query";

import React from "react";

async function EventDetail({ params }) {
  const { id } = await params; // ✅ params await করো
  const eventInfo = await getEventById(id);
  console.log(eventInfo);

  if (!eventInfo) {
    return <div>Event not found!</div>;
  }

  return (
    <div>
      <HeroSection event={eventInfo} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails event={eventInfo} />
          <EventVenue event={eventInfo} />
        </div>
      </section>
    </div>
  );
}

export default EventDetail;
