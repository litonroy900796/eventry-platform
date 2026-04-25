const EventDetails = ({ event }) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <div className="w-full h-full bg-[#242526] p-4 sm:p-5 lg:p-6 rounded-lg">
        <h2 className="font-bold text-xl sm:text-2xl">Details</h2>

        <div className="mt-3 text-[#AEAEAE] space-y-3 sm:space-y-4 prose prose-sm sm:prose base lg:prose-lg max-w-none">
          <p>{event?.details}</p>

          {event?.swags && (
            <ul className="list-disc pl-5">
              {event.swags.map((swag) => (
                <li key={swag}>{swag}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;