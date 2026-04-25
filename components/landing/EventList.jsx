import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  {events.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <svg className="w-16 h-16 text-[#6b6b8a] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-white font-semibold text-lg">No events found</h3>
      <p className="text-[#9C9C9C] text-sm mt-1">Try searching with a different keyword</p>
    </div>
  ) : (
    events.map((event) => (
      <EventCard key={event.id} event={JSON.parse(JSON.stringify(event))} />
    ))
  )}
</div>
  );
};

export default EventList;
