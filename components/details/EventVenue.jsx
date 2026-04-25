const EventVenue = ({ event }) => {
  const encodedLocation = encodeURIComponent(event?.location);
  const mapSrc = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;

  return (
    <div className="col-span-12 lg:col-span-4 bg-[#242526] rounded-lg overflow-hidden">
      
      {/* Map Container */}
      <div className="w-full h-[250px] sm:h-[300px] lg:h-[450px]">
        <iframe
          src={mapSrc}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Location Text */}
      <div className="p-3 sm:p-4">
        <p className="text-[#9C9C9C] text-sm sm:text-base">
          {event?.location}
        </p>
      </div>
    </div>
  );
};

export default EventVenue;