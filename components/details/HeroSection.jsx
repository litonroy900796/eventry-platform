import Image from "next/image";
import ActionButtons from "../ActionButtons";

const HeroSection = ({ event }) => {
  return (
    <section className="container my-8">
      
      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-2xl h-[400px] md:h-[500px] w-full">
        <Image
          src={event?.imageUrl}
          alt={event?.name}
          className="object-cover"
          fill
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18191a] via-[#18191a]/40 to-transparent" />

        {/* Location badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <svg className="w-3.5 h-3.5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-white text-sm font-medium">{event?.location}</span>
        </div>

        {/* Stats overlay on image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-white text-sm">{event?.interested_ids.length} Interested</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-sm">{event?.going_ids.length} Going</span>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl text-white">
            {event?.name}
          </h1>
          <p className="text-[#9C9C9C] text-base mt-2 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {event?.location}
          </p>
        </div>

        <ActionButtons eventId={event?.id} event={event} fromDetails={true} />
      </div>

    </section>
  );
};

export default HeroSection;