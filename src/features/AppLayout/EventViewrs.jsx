import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
function EventViewrs({ events }) {
  // Use useEffect to log the events everytime it gets updated
  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]); // Add events to dependency array

  return (
    <div className="p-4">
      {events.length > 0 ? (
        <div>
          {/* Use the current date in the heading */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {/* Assuming the events array contains objects with a 'date' property, 
            you can use the first event's date for the heading. */}
          {events[0]?.date ? format(parseISO(events[0].date), "yyyy-MM-dd") : "Today"} Tasks






          </h2>

          {events.map((ev, evIndex) => (
            <div
              key={evIndex}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold text-blue-600">{ev.name}</h3>
              <p className="text-gray-600">Slot: {ev.slot}</p>
              <p className="text-gray-600">Subject: {ev.subject}</p>
              <p className="text-gray-600">Location: {ev.location}</p>
              <p className="text-gray-600">Content: {ev.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No events to display.</p>
      )}
    </div>
  );
}

export default EventViewrs;
