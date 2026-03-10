const EventVenue = ({ event }) => {
  // location কে URL encode করো
  const encodedLocation = encodeURIComponent(event?.location);
  const mapSrc = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;

  return (
    <div className="overflow-hidden rounded-lg col-span-2 bg-[#242526]">
      <div className="w-full">
        <iframe
          src={mapSrc}
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="p-4">
        <p className="text-[#9C9C9C] text-base mt-1">{event?.location}</p>
      </div>
    </div>
  );
};

export default EventVenue;
