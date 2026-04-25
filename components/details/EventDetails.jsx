const EventDetails = ({ event }) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="w-full h-full bg-[#242526] p-4 sm:p-5 lg:p-6 rounded-lg">
        
        {/* Details */}
        <h2 className="font-bold text-xl sm:text-2xl text-white">About This Event</h2>
        <div className="mt-3 text-[#AEAEAE] space-y-3 prose prose-sm sm:prose lg:prose-lg max-w-none">
          <p>{event?.details}</p>
        </div>

        {/* Swags */}
        {event?.swags?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg text-white mb-3">What You Get</h3>
            <div className="flex flex-wrap gap-2">
              {event.swags.map((swag) => (
                <span
                  key={swag}
                  className="bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 text-sm px-3 py-1.5 rounded-full"
                >
                  {swag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Event Info Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {event?.date && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Date</p>
              <p className="text-white text-sm font-medium">
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}
          {event?.time && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Time</p>
              <p className="text-white text-sm font-medium">{event.time}</p>
            </div>
          )}
          {event?.ticketPrice !== undefined && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Ticket</p>
              <p className="text-white text-sm font-medium">
                {event.ticketPrice === 0 ? "Free" : `$${event.ticketPrice}`}
              </p>
            </div>
          )}
          {event?.capacity && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Capacity</p>
              <p className="text-white text-sm font-medium">{event.capacity} people</p>
            </div>
          )}
          {event?.organizer && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Organizer</p>
              <p className="text-white text-sm font-medium truncate">{event.organizer}</p>
            </div>
          )}
          {event?.category && (
            <div className="bg-[#27292F] rounded-lg p-3">
              <p className="text-[#6b6b8a] text-xs uppercase tracking-widest mb-1">Category</p>
              <p className="text-white text-sm font-medium">{event.category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;