import { useEffect, useState } from "react";

function EventViewrs() {
  const [eventsMo, setEventsMo] = useState({});

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    setEventsMo(storedEvents);
  }, []); // Removed eventsMo from the dependency array

  return (
    <div className="p-4">
      {Object.keys(eventsMo).length > 0 ? (
        Object.entries(eventsMo).map(([date, events], index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{date}</h2>
            {events.map((ev, evIndex) => (
              <div key={evIndex} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-600">{ev.name}</h3>
                <p className="text-gray-600">Slot: {ev.slot}</p>
                <p className="text-gray-600">Subject: {ev.subject}</p>
                <p className="text-gray-600">Location: {ev.location}</p>
                <p className="text-gray-600">Content: {ev.content}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No events to display.</p>
      )}
    </div>
  );
}

export default EventViewrs;
