import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-xl bg-[#242526] border border-[#CCCCCC]/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group">

      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={event?.imageUrl}
          alt={event?.name}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242526]/80 to-transparent" />

        {/* Category badge */}
        {event?.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-indigo-600/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {event.category}
            </span>
          </div>
        )}

        {/* Ticket Price */}
        {event?.ticketPrice !== undefined && (
          <div className="absolute top-3 right-3">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {event.ticketPrice === 0 ? "Free" : `$${event.ticketPrice}`}
            </span>
          </div>
        )}

        {/* Location badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-white text-xs font-medium truncate max-w-32">{event?.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link
          href={`/details/${event?.id}`}
          className="font-bold text-lg text-white hover:text-indigo-400 transition-colors line-clamp-1 block"
        >
          {event?.name}
        </Link>

        {/* Date */}
        {event?.date && (
          <div className="flex items-center gap-1.5 mt-1.5 text-[#9C9C9C] text-xs">
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
            {event?.time && (
              <span className="text-[#6b6b8a]">· {event.time}</span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2.5">
          <div className="flex items-center gap-1.5 text-[#9C9C9C] text-sm">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{event?.interested_ids.length} Interested</span>
          </div>

          <div className="w-1 h-1 bg-[#6b6b8a] rounded-full" />

          <div className="flex items-center gap-1.5 text-[#9C9C9C] text-sm">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event?.going_ids.length} Going</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-[#CCCCCC]/10">
          <ActionButtons eventId={event?.id} event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;